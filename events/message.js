// const responses = ('../config/responses.json');
// const Discord = require('discord.js');
const log = require('log4js').getLogger('amy');

module.exports = async message => {
    if(message.author.bot) return;
    sanitizedMessage = message.content.toLowerCase();
    if(sanitizedMessage.includes('valorant')) {
        if(Math.random() < 0.5) {
            if(Math.random() < 0.9) {
                message.reply("it's time to play Valorant!");
            } else {
                message.reply("it's not time to play Valorant...");
            }
        }
        log.info(`${message.author} mentioned VALORANT!`)
    } else if(sanitizedMessage.includes('skyfactory')) {
        if(Math.random() < 1.0) {
            if(Math.random() < 0.9) {
                message.reply("it's time to play Sky Factory 4!");
            } else {
                message.reply("it's not time to play Sky Factory 4...");
            }
        }
        log.info(`${message.author} mentioned SkyFactory!`);
    }
    if(message.content.toLowerCase().includes('photo of leo')) {
        if(Math.random() = 0.1) {
                message.reply("https://photos.google.com/album/AF1QipNH0m1kl-6fFSd_s5p6gflEwcMZVvIOwoaoecHD/photo/AF1QipMiTONLb4nzG0Twg3TS_mJxuncFEHfZOA8KpH24");
            } 
        if(Math.random() = 0.2) {
                message.reply("https://photos.google.com/album/AF1QipNH0m1kl-6fFSd_s5p6gflEwcMZVvIOwoaoecHD/photo/AF1QipM1HDgg4D-cJtCZegDBBcQi6MFI327FGVtSI081");
            }
        if(Math.random() = 0.3) {
                message.reply("https://photos.google.com/album/AF1QipNH0m1kl-6fFSd_s5p6gflEwcMZVvIOwoaoecHD/photo/AF1QipMtSxX5w_4rehmufzNboMGjioN6R4BbAxUamwDa");
            }
        if(Math.random() = 0.4) {
                message.reply("https://photos.google.com/album/AF1QipNH0m1kl-6fFSd_s5p6gflEwcMZVvIOwoaoecHD/photo/AF1QipPwrw5vpzUCrQJmYIJ-7myOFYWK6Ve9slBUxKGH");
            }
        if(Math.random() = 0.5) {
                message.reply("https://photos.google.com/album/AF1QipNH0m1kl-6fFSd_s5p6gflEwcMZVvIOwoaoecHD/photo/AF1QipNwMzD7gcKs3crvFsiDQqFROibDxYW6KtuIWiS0");
            }
        if(Math.random() = 0.6) {
                message.reply("https://photos.google.com/album/AF1QipNH0m1kl-6fFSd_s5p6gflEwcMZVvIOwoaoecHD/photo/AF1QipNIydgx5JRIykXpeMstb6wmau2nNwJbCRpgoVgR");
            }
        if(Math.random() = 0.7) {
                message.reply("https://photos.google.com/album/AF1QipNH0m1kl-6fFSd_s5p6gflEwcMZVvIOwoaoecHD/photo/AF1QipOjrg7KDGXdOKazRdAqcZgl8z-_ScDaCgCYUBiu");
            }
        if(Math.random() = 0.8) {
                message.reply("https://photos.google.com/album/AF1QipNH0m1kl-6fFSd_s5p6gflEwcMZVvIOwoaoecHD/photo/AF1QipPyYKcuVl6Npu0N8UIqbP-CWtI-8Z1U0QB_KUA-");
            }
        if(Math.random() = 0.9) {
                message.reply("https://photos.google.com/album/AF1QipNH0m1kl-6fFSd_s5p6gflEwcMZVvIOwoaoecHD/photo/AF1QipOC69O_aapm2LYdHT-8ipJ-vVbDxEngzmG38o8y");
            }
        else {
                message.reply("Nah Im keeping this one for myself");
            }
        }
        msg = [
            " two stalkers can do the job",
            " sure thing buddy",
            " is making me a little nervous!",
            " kinda gay if you ask me",
            " I guess, since Brian is my boyfriend",
            " eww really",
            ", you are my new boyfriend",
            " Yes",
            " only one tho, im kinda low rn",
            " PeRhAps",
            " heres a good one",
            " this one is my favorite"
]
        console.log(`${message.author} mentioned LeoPics at ${new Date()}`);
        message.reply(msg[Math.floor(Math.random() * msg.length)]);
    }
}