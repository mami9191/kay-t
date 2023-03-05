const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
exports.run = (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) {
    let aloneyetki = new Discord.MessageEmbed()
      .setColor(ayarlar.renk)
      .setDescription(
        `**Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`
      );

    return message.channel
      .send(aloneyetki)
      .then((m) => m.delete({ timeout: 7000 }));
  }

  let question = args.join(" ");

  let user = message.author.username;

  const embedd = new Discord.MessageEmbed()

    .setDescription(`Yazı Yazman Gerek`)
    .setThumbnail(
      `https://cdn.discordapp.com/avatars/727095763468943401/aec455a82546c23743de99a4d0bcf778.png?size=1024`
    );

  if (!question)
    return message.channel.send(embedd).then((msg) => msg.delete(5000));

  const embed = new Discord.MessageEmbed()

    .setColor(ayarlar.renk)
    .setThumbnail(
      `https://cdn.discordapp.com/avatars/727095763468943401/aec455a82546c23743de99a4d0bcf778.png?size=1024`
    )
    .setTimestamp()
    .setAuthor(`Alone Duyuru Sistemi`, client.user.avatarURL())
    .setTitle(`\n\n**${question}**`)
    .setFooter("Alone", client.user.avatarURL())
    .setThumbnail(
      "https://cdn.discordapp.com/avatars/727095763468943401/5272620f418d5d824b8dd45f99eee5f2.webp?size=1024"
    );

  message.channel.send(embed).then(function (message) {});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: "duyuru",
  description: "",
  usage: "duyuru",
};
