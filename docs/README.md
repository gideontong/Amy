# Amy

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![Amy](https://i.imgur.com/q2YAmF5.png)

Some information is coming soon! Quick links: [setup process](setup) and [usage](usage).

## Upcoming Changes

* *Amy* no longer responds to you if you mention *VALORANT* in a link

## Upcoming Features

* *Amy* will now randomly troll you
* The probability for which *Amy* trolls you is configurable (currently 1%)
* What *Amy* trolls you with is configurable
* Added easter eggs to *Amy*
* Added collectible achievements
* Added collectible secret achievements
* Added a new custom about screen when you join a server
* Added a new custom welcome message when you join a server
* Added *Kevin*
* *Kevin* will randomly decide if it's time for you to die
* The probability for which you die by *Kevin* is configurable (currently 3%)

## Upcoming Commands

### Amy's Commands

* `!clear` will now clear recent chat history (**admins only**)
* `!welcome` triggers the new about screen manually (**admins only**)
* `!generateachievement (text)` will generate a test achievement (**admins only**)
* `!grantachievement (ID)` will grant yourself the achievement (**admins only**)
* `!revokeachievement (ID)` will revoke yourself from the achievement (**admins only**)
* `!tell` will force the bot to say something (**admins only**, or if you are Amy)
  * `!tell (channel ID) (message)` will send a message to the channel with that specific ID
  * `!tell (channel) (message)` will send a message to the channel mentioned
  * If you do not specify a message and only a channel, Amy will send the name of the channel to the current channel
  * Asking Kevin to send a message to a channel that does not exist will result in doing nothing
* `!printemoji (ID)` will repeat the emoji (**admins only**, or if you are Amy)
  * Since this does not provide input validation, it's been reserved for admins until further notice
* `!qr (text, website, or phone number)` will generate a QR code
* `!website` takes you to [Amy's website](https://amyhelps.ml)
* `!joined` will tell you when you joined Discord
* `!docs` will point you to how to use Amy
* `!github` will take you to Amy's source code
* `!accountage` calculates how old your Discord account is
* `!howold` is an alias for `!accountage`, as well as command alias support
* `!howold`, `!accountage`, and `!joined` allow you to check someone else's age or join date by providing an argument
* `!insaneasylum` returns the infamous [Insane Asylum playlist](https://www.youtube.com/playlist?list=PL3q1l2_RQCr7fk0jyOmNwiUp9F6CaDyQd)
* `!youtube` takes you to the [Dudes of 708 YouTube channel](https://www.youtube.com/channel/UCdbqUWT3_0WgybqNuCX9uJA)
* `!rules` returns the list of rules for the server
* `!achievements` will show you your achievement progress

### Kevin's Commands

* `?tell` will force Kevin to say something (**admins only**, or if you are Kevin)
  * `?tell (channel ID) (message)` will send a message to the channel with that specific ID
  * `?tell (channel) (message)` will send a message to the channel mentioned
  * If you do not specify a message and only a channel, Kevin will send the name of the channel to the current channel
  * Asking Kevin to send a message to a channel that does not exist will result in nothing happening
  * `?tell` has feature parity with Amy's `!tell`
