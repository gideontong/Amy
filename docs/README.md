<p align="center">
  <img src="https://i.imgur.com/W7O2qJp.png" alt="Amy's Profile">
</p>

[![Build Status](https://travis-ci.com/gideontong/Amy.svg?branch=master)](https://travis-ci.com/gideontong/Amy) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) ![HitCount](http://hits.dwyl.com/gideontong/Amy.svg) ![Latest Release](https://img.shields.io/github/v/release/gideontong/Amy) ![MIT License](https://img.shields.io/github/license/gideontong/Amy)

-----

🐱‍🏍 Amy is your personal assisstant, reimagined. In other words, Amy is a Discord bot for the [Dudes of 708 Discord server](https://discord.gg/WUGMTcZ). You can also visit our [YouTube homepage](https://www.youtube.com/channel/UCdbqUWT3_0WgybqNuCX9uJA) to see the kind of content that is relevant to the usage of Amy. [Click here to add Amy to your Discord server.](https://discord.com/api/oauth2/authorize?client_id=721503241531162707&permissions=8&redirect_uri=https%3A%2F%2Famyhelps.ml&scope=bot)

Amy builds upon over a decade of experience in social interactions at scale using various messaging platforms, with the current platform of choice being [Discord](https://discord.com) as the community comes together to build best-in-class ideas and practices for our own purposes.

Amy currently runs on [Gideon Tong's Server Network](https://me.gideontong.com) and has been given her own private subdomain space. If you would like to get involved in helping to shape the evolution of not just Amy but also future smart personal assisstants, consider reading the [contributor's guide](CONTRIBUTING.md) to get started.

-----

## Table of Contents

* **README**
  * [Contributor's Guide](CONTRIBUTING.md)
  * [Security Disclosures](SECURITY.md)
  * [Changelog](CHANGELOG.md)
* [Getting Started](usage/README.md)
* [Getting Started for Developers](setup/README.md)
* [Achievements](achievements/README.md)
* [Data Model](storage/README.md)
  * [Backups](storage/BACKUP.md)

-----

## Features

* Custom welcome, about, join, and help messages tailored to communities
* Utility commands to find out user information
* Moderation commands to help moderators manage a community and find out user details
  * Wipe recent channel history
  * Control and manage announcements
* Easter eggs and collectible achievements to create friendly competition between memebers of a community
  * Intelligently respond to certain users
* Calls members out when they delete a spicy message (like an image)
* Randomly prank users of a Discord server
* All values, variables, and settings are admin-configurable
* Advanced permissions system with clear hierarchy and inhereitance
* Multiple bot instances controlled via one dashboard
* Automatic multi-process load balancing without dependencies

Amy is in active development, and if you have a feature request, simply fill out an [issue](https://github.com/gideontong/Amy/issues) and we will get to it as soon as possible.

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

### Developers

If you're a developer and would like to get started, see the [setup guide](setup/README.md).

## Support

If you need support, you can start with reference guides and Google searches.

That said, if you have questions, feel free to [reach out to me](mailto:gideon@gideontong.com) if you have any questions.

## Contributing

There are many ways you can contribute to the project, and we greatly appreicate all the work you want to put into helping me making Amy better! For example:

* [Submit bugs and feature requests](https://github.com/gideontong/Amy/issues), and if you see a bug report, you can help verify it by testing it as well.
* Review the documentation (*this page and more!*), then make a [pull request](https://github.com/gideontong/Amy/pulls) for anything from typos to new content.
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

**Amy** is licensed under the MIT License and is copyrighted by &copy; Gideon Tong 2019-2021. She depends on the [Discord.js](https://discord.js.org), [qrcode](https://github.com/soldair/node-qrcode), [canvas](https://github.com/Automattic/node-canvas), [youtube-dl](https://github.com/przemyslawpluta/node-youtube-dl#readme) and [log4js](https://github.com/log4js-node/log4js-node) Node packages, which are both licensed under the Apache-2.0 License.
