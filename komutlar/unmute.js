const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");



exports.run = async (client, message, args) => { 
    if(!message.member.permissions.has("MUTE_MEMBERS")) {
            message.channel.send("Bu Komutu Kullanabilmek İçin Üyeleri Sustur Yetkisine Sahip Olmalısınız");
            return;
        }
    message.delete();

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`Lütfen Kullanıcı Etiketleyin`);

    let Role = message.guild.roles.cache.find(role => role.name === "⌭ | Muted").id;

    if (!Role)
      return message.channel.send(
        `Burada Mute Rolü Yok, Yani Üye Artık Susturulmuş Değil!`
      );

    if (!Member.roles.cache.has(Role)) {
      return message.channel.send(`Bu Kullanıcının Susturulması Yok`);
    }

    let Embed = new MessageEmbed()
      .setColor("#15ff00")
      .setTitle(`Susturulma Kaldırıldı <a:darksidehosgeldin:767406748964618240>`)
      .addField(`<a:darkside:767406735039529002> Moderatör`, `${message.author}`,true)
      .addField(`<a:darkside:767406735039529002> Susturulan Kullanıcı`, `${Member.user}`,true)
      .setThumbnail("https://cdn.discordapp.com/attachments/764261308010725456/934158194933125171/unmute.gif")
      .setFooter(`${message.author.username} Tarafından Kaldırıldı`, client.user.avatarURL())
      .setTimestamp();

    if (Role && Member.roles.cache.has(Role)) {
      Member.roles.remove([Role]);
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
  name: "unmute"
};