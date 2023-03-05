const { Discord, MessageEmbed} = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')


exports.run = async (client, message, args) => {

    let kadınROL = ayarlar.kadınROL 
    let kayıtsızROL = ayarlar.kayıtsızROL
    let kayıtlıROL = ayarlar.kayıtlıROL
    let yetkili = ayarlar.yetkiliROL
    let kayıtLOG = ayarlar.kayıtLOG
    
    const yetkiliuyarı = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setDescription(`Bu Komutu Kullanmak İçin <@&${yetkili}> Yetkisine Sahip Olman Gerek!`)
.setColor(`RED`)

    if(!message.member.roles.cache.has(yetkili)) return message.channel.send(yetkiliuyarı)


if(!args[0]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
  
let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(`${args[0]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return;
  
  
  
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();  
   var kontrol;
if (kurulus < 1296000000) kontrol = ' Şüpheli'
if (kurulus > 1296000000) kontrol = ' Güvenli'
  
  
  
let isim = args[1]

if(!isim) return message.channel.send(`Üyenin ismini belirtmelisin.`)

let yaş = args[2];
if(!yaş) return message.channel.send(`Üyenin yaşını belirtmelisin.`)
  
const emb = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setTimestamp()
.setFooter('Kayıt Saati')
.setColor(`#fffff0`)
let tag = ayarlar.tag || ''
message.guild.members.cache.get(kullanıcı.id).setNickname(`${tag} ${isim} | ${yaş}`)
message.guild.members.cache.get(kullanıcı.id).roles.add(kadınROL)
  
  if(ayarlar.kadınICON) {
    let kadınICON = ayarlar.kadınICON
      message.guild.members.cache.get(kullanıcı.id).roles.add(kadınICON)
  }
message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL)

 
let embed2 = new MessageEmbed()
.setTitle("Kayıt Yapıldı <a:darksidesiyahmavitik:934093958060077147>")
.setColor('BLACK')
.setFooter("Darkside",client.user.avatarURL())
.setDescription(`<a:darkside:767406735039529002> **${kullanıcı} aramıza <@&${ayarlar.kadınROL}> rolü ile katıldı.**`)
.addField(`<a:darkkside:934180129670848592> Darkside'a Hoş geldin<a:darksidekalp:767406735551234098>` , `${kullanıcı}`,true)
.addField(`<a:darkkside:934180129670848592> Kaydı gerçekleştiren yetkili` , `${message.author}`,true)
.setThumbnail("https://cdn.discordapp.com/attachments/764261308010725456/934177010996113559/MOSHED-2022-1-21-18-58-35-min.gif")
 .setTimestamp();


client.channels.cache.get(ayarlar.kayıtLOG).send(embed2)
let embed3 = new MessageEmbed()
.setColor('BLACK')
.setFooter("Darkside",client.user.avatarURL())
.setTitle("Kayıt Yapıldı <a:darksidesiyahmavitik:934093958060077147>")
.setThumbnail("https://cdn.discordapp.com/attachments/764261308010725456/934177010996113559/MOSHED-2022-1-21-18-58-35-min.gif")
.setDescription(`**
<a:darkside:767406735039529002> ${kullanıcı}  adlı kişinin kaydı başarıyla yapıldı.
<a:darkside:767406735039529002> İsim Yaş | **${isim} | ${yaş}**
<a:darkside:767406735039529002> Verilen Roller | <@&${ayarlar.kadınROL}>
<a:darkside:767406735039529002> Alınan Roller | <@&${ayarlar.kayıtsızROL}>**`)
 .setTimestamp();
message.channel.send(embed3)


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k',"kadın"],
  permLevel: 0
};

exports.help = {
  name: 'kadın'
}