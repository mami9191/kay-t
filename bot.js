const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
  require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
var Jimp = require('jimp');
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


const log = message => {
  console.log(` => { ${message} } `);
  
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};






client.on("ready", () => {//
  client.user.setPresence({
    game: { name: `Darkside❤️`, type: "PLAYING" },
    status: "online" //dnd, idle, online
  });
});



// İSİM YAŞ İSİM DEĞİŞTİRME 

client.on("guildMemberAdd", member => {
  let tag = ayarlar.tag;
  //
  
});

// İSİM YAŞ İSİM DEĞİŞTİRME SON






//BOT ROLÜ
client.on(`guildMemberAdd`, async member => {
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.roles.add(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.roles.add(kayıtsızROL)
})

/// kayıtsız rolü son






// BOT OTOROL

client.on('guildMemberAdd', async member => {
if(member.user.bot) {
  const botROL = ayarlar.botROL
member.roles.add(botROL)
}
})
// GİRİŞ 
  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  let rol = ayarlar.kayıtsızROL
 member.roles.add(rol)

  var kontrol;
if (tarih < 1296000000) kontrol = 'Bu Kullanıcı **Şüpheli** <a:darksidered:767406735362228234>'
if (tarih > 1296000000) kontrol = 'Bu Kullanıcı **Güvenli** <a:darksideonay:767406735534456842>'
  moment.locale("tr");
  let kanal1 = client.channels.cache.find(x => x.id === kanal);
    let giris = new Discord.MessageEmbed()
    .setDescription(`**
 <a:darkkside:934180129670848592> • Hoşgeldin **${member}** <a:darksidehosgeldin:767406748964618240>
 
 <a:darkkside:934180129670848592> • Seninle birlikte ${member.guild.memberCount} kişiyiz <a:darksidekalp:767406735551234098>
 
 <a:darkkside:934180129670848592> • [ **${ayarlar.tag}** ] Tagımızı alarak ekibimize katılabilirsin <a:darksideking:934045821492674610>
 
 <a:darkkside:934180129670848592> • <@&${ayarlar.yetkiliROL}> rolündekiler seninle ilgilenecektir.
 
 <a:darkkside:934180129670848592> • ${kontrol} 
 
 <a:darkkside:934180129670848592> • Hesabın Oluşturulma Tarihi: \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`
 
 <a:darkkside:934180129670848592> • Ses teyit odasında kaydınızı yaptırabilirsiniz <a:darksideyukleniyor:767406739782893568>

**`)
   
    .setThumbnail("https://cdn.discordapp.com/attachments/764261308010725456/934082313078313040/d95y9w-f008e97d-bbeb-4704-8ec4-a685fb754e46.png")
    .setColor("#000000")
    .setFooter("Darkside" , client.user.avatarURL())
    .setTimestamp()
    
      client.channels.cache.find(x => x.id === kanal).send(`<@&${ayarlar.yetkiliROL}>`)
client.channels.cache.find(x => x.id === kanal).send(giris)
    
  });

client.login(ayarlar.token);

// 7/24

const kontrol = require("node-fetch");
setInterval(() => {
  kontrol(`https://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  console.log(`Botu aktif ettim!`);
}, 600000);

// SESE SOKMA

client.on("ready", async () => {
      let botVoiceChannel = client.channels.cache.get("895347325264867359");
      if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot Ses Kanalına Bağlanamıyor, Lütfen Ses Kanal ID'sini Kontrol Et."));
    });


const iltifatlar = [
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Seni hakedecek ne yaptım bilmiyorum. Nasıl bu kadar şanslı olabilirim?',
  'Sen olmadan nasıl var olacağımı bilmiyorum.',
  'Mutluluk ne diye sorsalar, cevabı gülüşünde ve o sıcak bakışında arardım.',
  'Dünyadaki tüm şiirler sana yazılmış gibi hissettiriyorsun.',
  'Sen benim kabul olmuş en büyük duamsın.',
  'Sabahları görmek istediğim ilk şey sensin.',
  'Huzur kokuyor geçtiğin her yer.',
  'O kadar iyi bir arkadaşsın ki, tanıştığın herkes için mükemmel bir hediye gibisin.',
];
// İLTİFATLARI BU ŞEKİLDE İSTEDİĞİNİZ KADAR ÇOĞALTABİLİRSİNİZ
var iltifatSayi = 0; // Buraya ellemeyin!
client.on("message", async message => {
  if(message.channel.id !== "934044665454419989" || message.author.bot) return;
  iltifatSayi++
  if(iltifatSayi >= 50) { // 50 yazan yer, 50 mesajda bir iltifat edeceğini gösterir, değiştirebilirsiniz.
    iltifatSayi = 0;
    const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
    message.reply(`**${(iltifatlar)[random]}**`);
  };
});
