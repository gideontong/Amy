# Data Model

> `config`

Stores config files.

> `data`

Handeled by node-persist

* data
  * achievements
    * \<id>: `boolean` - *stores the state of achievement*
  * statistics
    * use_\<command>: `integer` - *stores number of times command has been used*
    * commands: `integer` - *unique commands that have been used*
    * say_eh: `Array<integer>` - *stores number of times "eh" has been said, with index in array as number of h's*
    * discover_comment: `Array<boolean>` - *stores whether or not the specified comment has been discovered*
