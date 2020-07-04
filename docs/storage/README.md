# Data Model

-----

![HitCount](http://hits.dwyl.com/gideontong/Amy.svg) • [Return to main README](../README.md)

-----

Amy's data model utilizes two folders, `config` and `data` and these are the folders of interest to backup when performing auto-backup of the server. Currently, the reccomended method of backup is described in the [backup guide](BACKUP.md) and will remain this way until Amy has a built-in backup method.

## config Folder

> The `config` folder stores configuration files for Amy and does not contain any userland data. Modifying data in this folder currently requires a server reboot, although some of that may change in the future. If you are a contributor and would like to submit a pull request for this improvement, please note that any direct use of the `fs` Node module will cause your pull request to be automatically rejected due to cross-platform limitations with `fs`.

The `config` folder has 6 files, each of them in JSON format:

| File (.json)   | Description                                                       |
|----------------|-------------------------------------------------------------------|
| `achievements` | All achievements available to Amy                                 |
| `config`       | User-defined configuration, including welcome text                |
| `loading`      | All possible loading screen help messages                         |
| `permissions`  | Defined permissions for user-based actions                        |
| `responses`    | Static text responses to common events                            |
| `secrets`      | Location of all API keys, including login tokens for Discord bots |

## data Folder

> The `data` folder stores configurable data for userland actions. It is first ordered by user and then by data and is handled by the Node module `node-persist`, which makes use of JSON-based dictionaries (hash tables) and stores them in JSON format in the `data` folder.

The `data` folder has one file per user, organized by the hash of the Discord snowflake, which is in the same format as a [Twitter snowflake](https://developer.twitter.com/en/docs/basics/twitter-ids):

```bash
├───achievements
│   └───id
└───statistics
    ├───commands
    ├───discover_comment
    ├───discover_pepeyikes
    ├───github
    ├───say_eh
    └───use_command
```

Each data point of a user is defined in the following table:

| Name or ID                      | Type           | Description                                                                                                                                            |
|---------------------------------|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `achievements.{id}`             | boolean        | Stores the state of the achievement for a given ID                                                                                                     |
| `statistics.commands`           | int            | The number of unique commands that have been used                                                                                                      |
| `statistics.discover_comment`   | Array<boolean> | The state of whether or not the user has discovered a comment in Kevin's sarcastic arsenal, with the array index being equal to Kevin's response index |
| `statistics.discover_pepeyikes` | boolean        | Whether or not Kevin has ever reacted `:pepeYikes:` to this user                                                                                       |
| `statistics.github`             | str            | User's GitHub username                                                                                                                                 |
| `statistics.say_eh`             | Array<int>     | The number of times "eh" has been said, with the array's index being the number of h's in the "eh"                                                     |
| `statistics.use_{command}`      | int            | The number of times a specific command has been used                                                                                                   |
