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

    // Listen event 'authenticated'
    client.on('authenticated', (session) => {
        console.log('Authenticated');
    });

    // listen for create qr code
    client.on('qr', (qr) => {
        console.log('QR code received!');

        // showing qr code
        qrcode.generate(qr, { small: true });
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
                res.error('Something went wrong on sending message!');
                console.log(error)
            });
        })
    });

    client.initialize();
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})