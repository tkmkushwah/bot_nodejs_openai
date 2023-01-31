const TelegramBot = require("node-telegram-bot-api");   //it helps to make and control the telegram bot 
const { Configuration, OpenAIApi } = require("openai");//
const dotenv=require('dotenv')

dotenv.config();

const botToken = process.env.BOT_TOKEN;
const openaiToken = process.env.OPEN_API_KEY;
const config = new Configuration({    //configuration for the openai api
  apiKey: openaiToken,
});

const openai = new OpenAIApi(config);

const bot = new TelegramBot(botToken, {   // creating new bot using the token of the bot.
  polling: true
});


bot.onText(/\/start/, (msg) => {       //settig up message on start
  bot.sendMessage(msg.chat.id, "Welcome To AI ChatBot");
});

bot.on("message", async (msg) => {        //it listens the message
  const chatId = msg.chat.id;

  const reply = await openai.createCompletion({    // auto rply by openai with model babbage/ada/devinci
    max_tokens: 100,
    model: "babbage",
    prompt: msg.text,                               //in response to this text
    temperature: 0.5,
  });

  bot.sendMessage(chatId, reply.data.choices[0].text); //send the rply on the same chatId in text format
});
