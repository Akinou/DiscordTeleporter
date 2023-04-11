const Discord = require('discord.js');
const client = new Discord.Client();

const yourVoiceChannelID = 'votreIDdeSalonVocal';
const memberID = 'l-ID-de-l-utilisateur-a-deplacer';

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag} !`);
});

client.on('message', message => {
  if (message.content.startsWith('!deplacer ')) {
    const args = message.content.slice(10).split(' ');
    const member = message.guild.members.cache.get(memberID);
    
    if (member && member.voice.channel) {
      member.voice.setChannel(yourVoiceChannelID);
      message.channel.send(`Le membre ${member.user.username} a été déplacé dans votre salon vocal.`);
    }
    else {
      message.channel.send(`Le membre avec l'ID ${memberID} n'est pas en train de parler dans un salon vocal.`);
    }
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.member.id === memberID && newState.channel && newState.channel.id !== yourVoiceChannelID) {
    newState.member.voice.setChannel(yourVoiceChannelID);
  }
});

client.login('votre-jeton-ici');
