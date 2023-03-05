const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { 
  if(!message.member.permissions.has("MUTE_MEMBERS")) {
            message.channel.send("Bu Komutu Kullanabilmek İçin Üyeleri Sustur Yetkisine Sahip Olmalısınız");
            return;
        }
    //Start
    message.delete();

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`Lütfen Kullanıcıyı Etiketleyin`);

    let Role = message.guild.roles.cache.find(role => role.name === "⌭ | Muted").id;

    if (!Role)
      return message.channel.send(
        `Lütfen Mute Rolü Oluşturun | Role İsmi : Muted`
      );

    if (Member.roles.cache.has(Role)) {
      return message.channel.send(`Bu kullanıcı zaten susturulmuş!`);
    }

    let Reason = args.slice(1).join(" ");

    let Embed = new MessageEmbed()
      .setColor("#ff0a0a")
      .setTitle(`Kullanıcı Susturuldu <a:darksideunlem:906956437895405579>`)
      .addField(`<a:darkside:767406735039529002> Moderatör`, `${message.author} `,true)
      .addField(`<a:darkside:767406735039529002> Susturulan Kullanıcı`, `${Member.user}`,true)
      .addField(`<a:darkside:767406735039529002> Susturulma Nedeni`, `${Reason || "Sebep belirtilmedi."}`)
    .setThumbnail("https://cdn.discordapp.com/attachments/764261308010725456/934158194605981696/mute.gif")
      .setFooter(`${message.author.username} Tarafından Susturuldu`, client.user.avatarURL())
      .setTimestamp();

    if (Role && !Member.roles.cache.has(Role)) {
      Member.roles.add([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`Bir Şeyler Ters Gitti, Lütfen Tekrar Deneyin!`);
    }

   
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mute"],
  permLevel: 0
};

exports.help = {
  name: "mute"
};