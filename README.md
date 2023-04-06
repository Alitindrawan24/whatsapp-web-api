# Whatsapp Web Api
Whatsapp Web Api is application that integrated with whatsapp-web.js to allow access sending message using WhatsApp Account. A WhatsApp API client that connects through the WhatsApp Web browser app. It uses Puppeteer to run a real instance of Whatsapp Web to avoid getting blocked.

## Features
- Send message with API using your WhatsApp Account Number

## Tech
- Node JS
- Mongo DB

## Package/Frameworks
- Express JS
- Mongoose
- Whatsapp-web.js (https://wwebjs.dev/)

## Getting Started
To get started, you will need to have Node JS installed on your computer. You can download Node JS from the official website: https://nodejs.org/
And also you need to have Mongo DB installed on your computer for saving WhatsApp Session. You can download Mongo DB from the official website: https://www.mongodb.com/

Once you have Node Js and Mongo DB installed, follow these steps:
- Clone the repository to your local machine using
```bash
git clone https://github.com/Alitindrawan24/taste-bin.git
```
- Navigate to the project directory using the command line.
- Create .env file from .env.example and setup .env with your environment configuration
```bash
cp .env.example .env
```
- Install dependencies
```bash
npm install

```
- Run the app using
```bash
npm run start
```
- After the app is running, the QR Code will appear in the console. Scan the QR Code from your WhatsApp application
- After successful authenticated, you can send message using the API

## Endpoints
- ```POST /``` send message using parameter ```phone_number``` and ```message``` in body
- ```POST /logout``` logout from current session
- ```GET /contacts/{phone_number}``` get contact information from phone number
- ```GET /chats/{phone_number}``` get chat information from phone number

## Warning
By using this app will potentially cause your WhatsApp Account to be banned. To avoid the risk, please use safe WhatsApp Account for scanning the QR Code.

## Disclaimer
This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at https://whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.