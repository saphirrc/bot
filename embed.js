const discord = require('discord.js')
const { Command } = require('discord.js-commando')
module.exports = class embed extends Command {
    constructor(client) {
        super(client, {
            name: 'embed',
            memberName: 'embed',
            aliases: ['embed'],
            group: 'bot',
            description: 'crée un embed',
            guildOnly: true,    
        })
    }
    run(message, arg1){
        + message.delete({ timeout: 0, reason: 'It had to be done.' })
        const poll = new discord.MessageEmbed()
        .setTitle('outil de création d\'embed')
        .setDescription('0⃣ - titre\n\n1⃣ - description\n\n📨 - terminer')
        message.channel.send(poll) .then((m) => {
            m.react('0⃣')
            m.react('1⃣')
            m.react('📨')
            const filter = (reaction, user) => {
                return ['0⃣', '1⃣', '📨'].includes(reaction.emoji.name) && user.id === message.author.id;                
            };
            m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '0⃣') {
                    m.delete();
                    
                    poll.setTitle('quel nom voulez vous que l\'embed porte')
                    poll.setDescription('La commande va être annulée dans  30 secondes.')
                    message.channel.send(poll).then((me) => {
                    message.channel.createMessageCollector(
                        m => m.author.id === message.author.id,{ max: 1, time: 60000 }
                        ).on('collect', async msgResponse => {
                            if (msgResponse && !msgResponse.deleted) await msgResponse.delete();
                            // là tu fais ce que tu veux avec le contenu de ton message
                            console.log(msgResponse.content)
                            me.delete();    
                            m.delete();
                            const arg1 = msgResponse
                            this.run(message, arg1)
                        }).on('end', (_collected, reason) => {
                            if (reason !== 'limit') return message.reply('les 60 secondes sont écoulées !');
                        });
                    })
                }if(reaction.emoji.name === '📨'){
                    m.delete();
                    this.embedc(message, arg1)
                }if(reaction.emoji.name === '1⃣'){  
                    
                }
            })
            .catch(collected => {
                message.reply('time out');
            }); 
        })
    }
    embedc(message, arg1){
        const res = new discord.MessageEmbed()
        .setTitle(arg1)
       message.channel.send(res)
    }
}
