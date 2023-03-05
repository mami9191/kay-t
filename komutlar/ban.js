const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => { 
        if(!message.member.permissions.has("BAN_MEMBERS")) {
          let aloneyetki = new Discord.MessageEmbed()
          .setDescription("Bu Komutu Kullanabilmek İçin Üyeleri Yasakla Yetkisine Sahip Olmalısınız <a:darksideunlem:906956437895405579>")
          .setColor(ayarlar.renk)
            message.channel.send(aloneyetki).then(m => m.delete({timeout: 7000}))
            return;
        }
        const mentionMember = message.mentions.members.first();

        if (args.length === 0 || mentionMember === undefined) {
          let alonehata = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`Hatalı Kullanım <a:darksideunlem:906956437895405579> \n**Doğru Kullanım** .ban @Kullanıcı`)
          .setColor(ayarlar.renk)
            message.reply(alonehata).then(m => m.delete({timeout: 7000}))
            return;
        }
        const srole = message.member.roles.highest.position;
        const rrole = mentionMember.roles.highest.position;
        const brole = message.guild.me.roles.highest.position;
        
        if (srole>rrole) {
            if (brole>rrole) {
                mentionMember.ban();
               let aloneban = new Discord.MessageEmbed()
               .setColor(ayarlar.renk)
               .setAuthor(message.author.username, client.user.avatarURL())
          .setDescription(`**${mentionMember} Adlı Kullanıcı Sunucudan Banlandı <a:darksideban:767406736960520232> \n Banlayan Yetkili: ${message.member}**`)
          
               .setThumbnail("https://cdn.discordapp.com/attachments/764261308010725456/934192717670518845/discord-ban.gif")
                message.channel.send(aloneban);
            }
            else {
              let alonebulamıyorum = new Discord.MessageEmbed()
          .setDescription("Kullanıcıyı Bulamıyorum <a:darksideunlem:906956437895405579>")
          .setColor(ayarlar.renk)
                message.reply(alonebulamıyorum);
            }
        }
        else {
          let alonebanlayamam = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription("Sizinle Aynı Role Sahip Veya Daha Yüksek Bir Role Sahip Olan Kullanıcıyı Banlayamazsın <a:darksidered:767406735362228234>")
          .setColor(ayarlar.renk)
            message.reply(alonebanlayamam).then(m => m.delete({timeout: 7000}))  
        }
    }


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: '',
  usage: 'istatistik'
};
