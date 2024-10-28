const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');


// Gemini API
const apiKey = 'AIzaSyAwVLbEndqlQUMVdOj_RPX3iWTOd8j5U-o'; 
const genAI = new GoogleGenerativeAI(apiKey);

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMembers
    ] 
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1900,
    responseMimeType: "text/plain",
};

client.on('messageCreate', async message => {
    
    if (message.author.bot) return;

   
    const userMessage = message.content;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chatSession = model.startChat({ generationConfig, history: [] });

        
        const result = await chatSession.sendMessage(userMessage);
        message.channel.send(result.response.text());
    } catch (error) {
        console.error('Erreur lors de la génération de la réponse:', error);
        message.channel.send("Désolé, je ne peux pas répondre pour le moment.");
    }
});

// Token discord
client.login('');
