# Amy

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

🐱‍🏍 Amy is your personal assisstant, reimagined. In other words, Amy is a Discord bot for the [Dudes of 708 Discord server](https://discord.gg/WUGMTcZ). You can also visit our [YouTube homepage](https://www.youtube.com/channel/UCdbqUWT3_0WgybqNuCX9uJA) to see the kind of content that is relevant to the usage of Amy.

## Features

* Calls people out when they delete a message
* Randomly decides whether or not it's time to play the following video games
  * VALORANT
  * SkyFactory
* Pretends to share photos of Leo when asked
* Randomly replies to Leo
* Calls Leo out when he deletes a photo
* Manually control messages the bot sends
* Allows admins to wipe recent message history in channels
* Greets people when they join the server

## Getting Started

To get started, simply clone this repository to your hard drive. You'll need [Node 12.x](https://nodejs.org) or another JS code interpreter. Assuming you have Node installed, simply type

```bash
npm install --production
```

and while Node grabs the dependencies for you, move the file in `config/secrets-blank.json` to `config/secrets.json` and replace `token` with your [Discord API key](https://discord.com/developers/applications). Then start the application with

```bash
npm start
```

## Contributing

If you'd like to contribute, submit a [pull request](https://github.com/gideontong/Amy/pulls)! I review pull requests thoroughly and would love to see what you can cook up. If you want to just submit an idea instead, feel free to submit an [issue](https://github.com/gideontong/Amy/issues) instead.

### Maintainers

Amy is maintained by primarily [Gideon Tong](https://gideontong.com), whom you can contact by email at `<gideon [at] gideontong.com>` or Discord `Gideon [#5433]`. It has also seen contributions from [Max Buydakov](https://github.com/mbuyd).

Issues opened by [Kevin Stubbings](https://github.com/Kwstubbs), [Brian Lam](https://github.com/brilam8), and [Jesus Castillo](https://github.com/oscillatingneutrino) have also implemented valuable features into the bot.

### Licensing

**Amy** is licensed under the MIT License. She depends on the [Discord.js](https://discord.js.org) and [log4js](https://github.com/log4js-node/log4js-node) Node packages, which are both licensed under the Apache-2.0 License.
