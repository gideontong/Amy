const profile = {
    "embed": {
        "title": "You are Radiant!",
        "description": "You're absolutely insane! You're better than approximately 99% of all players and better than 50% of players on this server.",
        "color": 14342690,
        "fields": [
            {
                "name": "Overall KDA",
                "value": "1.0",
                "inline": true
            },
            {
                "name": "Winrate",
                "value": "50%",
                "inline": true
            },
            {
                "name": "Playtime",
                "value": "5,000h",
                "inline": true
            },
            {
                "name": "Match MVPs",
                "value": "500",
                "inline": true
            },
            {
                "name": "Team MVPs",
                "value": "500",
                "inline": true
            },
            {
                "name": "Favorite Agent",
                "value": "Sage",
                "inline": true
            },
            {
                "name": "Bonus Facts",
                "value": "• You are way better at defense, with a 75% winrate compared to a 25% winrate as an attacker.\n• You've planted the spike 1,000 times.\n• You've surrendered 0 times. A tryhard!\n• To see detailed stats, type `!valorant [stat name]` or `!valorant details` to see everything."
            }
        ],
        "author": {
            "name": "resident hacker's VALORANT Stats",
            "icon_url": "https://cdn.discordapp.com/avatars/132525049977503744/b9504c05a5805970f9b5551bedc9131d.png?size=128"
        },
        "footer": {
            "text": "Amy's Game Tracker v0.0.0",
            "icon_url": "https://cdn.bleacherreport.net/images/team_logos/328x328/valorant.png"
        },
        "thumbnail": {
            "url": "https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiers/24.png"
        }
    }
}

module.exports = async (bot, msg, args) => {
    if (args.length == 1) msg.channel.send("Help menu coming soon!");
    switch (args[1]) {
        case 'profile':
            msg.channel.send(profile);
            break;
        case 'kda':
            break;
        case 'matches':
            break;
        default:
            msg.channel.send("Help menu coming soon!");
            break;
    }
}