# Amy

[![Build Status](https://travis-ci.com/gideontong/Amy.svg?branch=master)](https://travis-ci.com/gideontong/Amy) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) ![HitCount](http://hits.dwyl.com/gideontong/Amy.svg) ![Latest Release](https://img.shields.io/github/v/release/gideontong/Amy) ![MIT License](https://img.shields.io/github/license/gideontong/Amy)

![Amy](https://i.imgur.com/q2YAmF5.png)

-----

🐱‍🏍 Amy is your personal assisstant, reimagined. In other words, Amy is a Discord bot for the [Dudes of 708 Discord server](https://discord.gg/WUGMTcZ). You can also visit our [YouTube homepage](https://www.youtube.com/channel/UCdbqUWT3_0WgybqNuCX9uJA) to see the kind of content that is relevant to the usage of Amy. To see the full docs, click [here](docs).

-----

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

### Achievements

![Achievements](https://i.imgur.com/2k0UDC2.png)

Amy supports custom achievements, which you can add your own instance of the bot (if you're running a custom instance for a private server), and soon will support admin-configurable achievements as well as default achievements that can be enabled globally (across servers) as well as only within a server.

## Getting Started

To get started, simply clone this repository to your hard drive. You'll need [Node 12.x](https://nodejs.org) or another JS code interpreter. Assuming you have Node installed, simply type

```bash
npm install --production
```

and while Node grabs the dependencies for you, move the file in `config/secrets-blank.json` to `config/secrets.json` and replace `token` with your [Discord API key](https://discord.com/developers/applications). Then start the application with

```bash
npm start
```

## Support

If you need support, you can start with reference guides and Google searches.

That said, if you have questions, feel free to [reach out to me](mailto:gideon@gideontong.com) if you have any questions.

## Contributing

There are many ways you can contribute to the project, and we greatly appreicate all the work you want to put into helping me making Amy better! For example:

* [Submit bugs and feature requests](https://github.com/gideontong/Amy/issues), and if you see a bug report, you can help verify it by testing it as well.
* Review the [documentation](https://github.com/gideontong/Amy/blob/master/docs/README.md), then make a [pull request](https://github.com/gideontong/Amy/pulls) for anything from typos to new content.
* Make comments on upcoming [changes to the source code](https://github.com/gideontong/Amy/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).
* Contribute to writing more comprehensive [unit tests](https://github.com/gideontong/Amy/tree/master/tests).

If you'd like to contribute directly to the code base, see the [contributor's guide](CONTRIBUTING.md) before getting started. But thank you so much if you'd like to contribute! Just submit a [pull request](https://github.com/gideontong/Amy/pulls), as I review pull requests thoroughly and would love to see what you can cook up. If you want to just submit an idea instead, feel free to submit an [issue](https://github.com/gideontong/Amy/issues) instead.

### Feedback

If you have any feedback, feel free to take this opportunity to become a contributor and open an [issue](https://github.com/gideontong/Amy/issues). Additionally, you can email the maintainer [Gideon Tong](https://gideontong.com) at [gideon@gideontong.com](mailto:gideon@gideontong.com).

### Maintainers

Amy is maintained by [Gideon Tong](https://gideontong.com), whom you can contact by email at [gideon@gideontong.com](mailto:gideon@gideontong.com) if you have any private concerns, security disclosures, or would like professional support. If you feel that you have a security disclosure and would like an encrypted form of transport, you may reach out to me with the PGP key listed in the [security page](SECURITY.md) of this repository.

#### Special Thanks

Contributions and feedback from [Amy Nguyen](https://www.github.com/amytnguyen01/), [Max Buydakov](https://github.com/mbuyd), [Kevin Stubbings](https://github.com/Kwstubbs), [Brian Lam](https://github.com/brilam8), [Leo Zhang](https://github.com/Leo10250), and [Jesus Castillo](https://github.com/oscillatingneutrino) have been implemented into this project.

Their contributions can be found in the contributor's graph, and range from finding typos in strings to creating feature request issues. Special thanks to Amy Nguyen for allowing her namesake to be the inspiration of this project.

### Licensing

**Amy** is licensed under the MIT License and is copyrighted by &copy; Gideon Tong 2019-2020. She depends on the [Discord.js](https://discord.js.org), [node-qrcode](https://github.com/soldair/node-qrcode), [node-canvas](https://github.com/Automattic/node-canvas), and [log4js](https://github.com/log4js-node/log4js-node) Node packages, which are both licensed under the Apache-2.0 License.
