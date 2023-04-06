const qrcode = require('qrcode-terminal');
const { Client, RemoteAuth } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = 3000

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI).then(() => {

    // initialize mongodb connection
    const store = new MongoStore({ mongoose: mongoose });

    // connect to Client server
    const client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000
        })
    });

    // listen event 'authenticated'
    client.on('authenticated', (session) => {
        console.log('Authenticated');
    });

    // listen for create qr code
    client.on('qr', (qr) => {
        console.log('QR code received!');

        // showing qr code
        qrcode.generate(qr, { small: true });
    });

    // listen for disconnected
    client.on('disconnected', (reason) => {
        console.log('Client was logged out', reason);
    });

    client.on('ready', () => {
        console.log('Client is ready!');

        // route for post request
        app.post('/', (req, res) => {
            const { phone_number, message } = req.body
            client.sendMessage(phone_number + '@c.us', message).then((response) => {
                res.send('Message sent successfully!');
                console.log(response)
            }).catch((error) => {
                res.send('Something went wrong on sending message!');
                console.log(error)
            });
        })

        // route for logout request
        app.post('/logout', (req, res) => {
            client.logout().then(async(response) => {
                res.send('Logout successfully!');
            }).catch((error) => {
                res.send('Something went wrong on logout!');
                console.log(error)
            });
        })

        app.get('/contacts/:phone_number', async(req, res) => {
            const { phone_number } = req.params

            const contact = await client.getContactById(phone_number + '@c.us');

            res.json({ contact });
        })

        app.get('/chats/:phone_number', async(req, res) => {
            try {
                const { phone_number } = req.params
                let chat = await client.getChatById(phone_number + '@c.us');
                let messages = await chat.fetchMessages()
                res.json({ messages })
            } catch (error) {
                res.json({ error })
            }
        })
    });

    client.initialize();
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})