const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()

import {stringToHoursMinutes, HoursMinutes} from './time'

var openTo: HoursMinutes = null

function open(until, member) {
    if (!until) {
        return
    }
    if (!member.roles.find("name", process.env.KEY_ROLE)) {
        return
    }
    let time = stringToHoursMinutes(until)
    if (time) {
        if (!openTo) {
            openTo = time
            broadcast(member.displayName + " håller nu **öppet** makerspace tills **" + openTo.toString() + "**.")
        } else {
            openTo = time
            broadcast(member.displayName + " har **ändrat** stängningstiden till **" + openTo.toString() + "**.")
        }
    }
}

function close(member) {
    if (!member.roles.find("name", process.env.KEY_ROLE)) {
        return
    }
    if (openTo) {
        openTo = null
        broadcast(member.displayName + " har nu **stängt** Makerspace.")
    }
}

client.on('ready', () => {
    console.log(`Authenticated as ${client.user.tag}!`);
});

client.on('message', msg => {
        let args = msg.content.split(" ")
        if (args[0] == "!öppet") {
            open(args[1], msg.member)
        }
        else if (args[0] == "!stängt") {
            close(msg.member)
        }
});

setInterval(() => {
    if (openTo == null) {
        return
    }
    let date: Date = new Date()
    if (openTo.hasPassed(new HoursMinutes(date.getHours(), date.getMinutes()))) {
        openTo = null
        broadcast("Makerspace är nu **stängt**.")
    }
}, 10000)

client.login(process.env.TOKEN);

function broadcast(message: String) {
    client.channels.get(process.env.BROADCAST_CHANNEL_ID).send(message)
}