// console.log("bot is running");
// const TelegramBot = require('node-telegram-bot-api');
// require("dotenv").config();

// const token = process.env.TOKEN;

// const bot = new TelegramBot(token, {
//     polling: true
// });

// const models = require("./models/index")

// bot.on('message', (msg) => {
//     console.log("Message notification");
//     console.log(msg);
//     let chat_id = msg.from.id;
//     let first_name = msg.from.first_name;
//     let last_name = msg.from.last_name;


//     bot.sendMessage(chat_id, "hello " + first_name + " " + last_name + ".Thanks for contacting brisk we will get back to you shortly.");

//     models.User.create({
//         firstName: first_name,
//         lastName: last_name,
//         message: msg.text
//     })

//     console.log("Stored to Database");

// });


const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require("dotenv").config();

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
const models = require("./models/index")
const app = express();

// Endpoint to receive a message and store it in the database
app.post('/message', (req, res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let message = req.body.message;

    models.User.create({
        firstName: first_name,
        lastName: last_name,
        message: message
    })

    console.log("Message stored in database");
    res.sendStatus(200);
});

bot.on('message', (msg) => {
    let chat_id = msg.from.id;
    let first_name = msg.from.first_name;
    let last_name = msg.from.last_name;

    bot.sendMessage(chat_id, "hello " + first_name + " " + ".Thanks for contacting brisk we will get back to you shortly.");
});

app.listen(3000, () => console.log('Server started on port 3000'));