# Changelog

![HitCount](http://hits.dwyl.com/gideontong/Amy.svg)

As always, you can read about and download the latest releases from [Amy's releases page](https://github.com/gideontong/Amy/releases).

## [v2.0.0 Elephant](https://github.com/gideontong/Amy/releases/tag/v2.0.0)

We will transition from using Greek letter to using names of animals in alphabetical order to name our releases. This marks the **elephant update**.

This release brings:

* *Amy* will no longer respond to you if you mention *VALORANT* in a link
* *Amy* will now randomly troll you
* What *Amy* trolls you with is configurable
* Added easter eggs to *Amy*
* Added collectible achievements
* Added collectible secret achievements
* Normally, *Amy* will give you the achievement, but there are some special achievements that *Kevin* awards
* Added a new custom about screen when you join a server
* Added a new custom welcome message when you join a server
* Added *Kevin*
* *Kevin* will randomly decide if it's time for you to die
* The probability for which you die by *Kevin* is configurable (currently 3%)

It also adds the following commands:

* `!clear` will now clear recent chat history (**admins only**)
* `!welcome` triggers the new about screen manually (**admins only**)
* `!loadingscreentips` will show you 3 loading screen tips before disappearing (**admins only**)
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
* `!ping` will tell you to ask GreustBot or Akov instead of Amy
* `!8ball` will now show you a 8-ball message after showing you some loading screen tips
* `?tell` will force Kevin to say something (**admins only**, or if you are Kevin)
  * `?tell (channel ID) (message)` will send a message to the channel with that specific ID
  * `?tell (channel) (message)` will send a message to the channel mentioned
  * If you do not specify a message and only a channel, Kevin will send the name of the channel to the current channel
  * Asking Kevin to send a message to a channel that does not exist will result in nothing happening
  * `?tell` has feature parity with Amy's `!tell`

## [v1.3.4 Gamma](https://github.com/gideontong/Amy/releases/tag/v1.3.4)

This release brings:

* The ability for admins to control how many recent messages are cleared with `!clear (messages)`, where (messages) is an optional argument
* People are now greeted when they join the server
* Slenderman was added to the game

## [v1.2.0 Beta](https://github.com/gideontong/Amy/releases/tag/v1.2.0)

This release brings:

* You can now manually control when Amy speaks, if you are the admin
* Admins can now use `!clear` to wipe the last 100 messages in a channel
* You can now watch fights between fake Amy and real Amy

## [v1.1.0 Alpha](https://github.com/gideontong/Amy/releases/tag/v1.1.0)

This release brings:

* Sometimes, Amy will reply to Leo for no reason. Just because she feels like it.
* She'll also call Leo out whenever he deletes a photo of himself.
* Also removed Slenderman from the game

## [v1.0.2 Pre-Alpha](https://github.com/gideontong/Amy/releases/tag/v1.0.2)

This release brings:

* Amy now randomly replies to Leo
* Amy is less likely to decide that it's time to play ***VALORANT***.
