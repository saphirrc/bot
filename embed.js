const { Command } = require('discord.js-commando')
module.exports = class embed extends Command
{
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
       if(message && !message.delete) await message.delete()
        const discord = require('discord.js')
        const poll = new discord.MessageEmbed()
        .setTitle('outil de création d\'embed')
        .setDescription('0⃣ - titre\n\n1⃣ - description\n\n 📨 - terminer')
        message.channel.send(poll).then((m) =>{
            m.react('0⃣')
            m.react('1⃣')
            m.react('📨')
            const filter = (reaction, user) => {
                return ['0⃣', '1⃣', '📨'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === '0⃣' && reaction.user === message.user){
                        reaction.remove(message.user)
                        reaction.emoji.name = '1⃣'
                        reaction.remove(message.user)
                        reaction.emoji.name = '📨'
                        reaction.remove(message.user)
                        const pol = new discord.MessageEmbed()
                        .setTitle('quel nom voulez vous que l\'embed aye')
                        .setDescription('La commande va être annulée dans  60 secondes.')
                        message.channel.send(pol)
                        .then((me) =>{
                            message.channel.createMessageCollector(
                                msg => msg.author.id === message.author.id,{ max: 1, time: 60000 }
                            ).on('collect', async msgResponse =>{
                                if (msgResponse && !msgResponse.deleted) await msgResponse.delete();
                                if (me && !me.deleted) await me.delete();
                                m.delete();
                                console.log(msgResponse.content)
                                const arg1 = msgResponse
                                this.run(message, arg1)
                            }).on('end', (_collected, reason) =>{
                                if (reason !== 'limit') return message.reply('les 60 secondes sont écoulées !')
                            });
                        })
                    }if(reaction.emoji.name === '1⃣' && reaction.user === message.user){
                        // à venir
                    }if(reaction.emoji.name === '📨' && reaction.user === message.user){
                        const emb = new discord.MessageEmbed()
                        emb.setTitle(arg1)
                        message.channel.send(emb)
                        m.delete();
                    }
                })
            .catch(collected => {
                message.reply('time out');
            });
        })
    } 
}
