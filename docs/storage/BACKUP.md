# Server Backup

> If you are a contributor, or you are looking for something to contribute to, a better guide on how to back up your server would be greatly appreciated!

-----

![HitCount](http://hits.dwyl.com/gideontong/Amy.svg) • [Return to data model](README.md) • [Return to main README](../README.md)

-----

Currently, the reccomended method of server backup is to use a `cron` job and a backup service of choice (like Borg Backup, Google Drive, and others...) in order to back up your critical user data.

Here is a simple guide on how to set it up (you'll need root permissions), if you are running on Linux:

1. Set up your backup software of choice. I'll pretend my backup command is `backup` and it copies my `data` and `config` folders to a remote cloud service, like AWS.
2. Navigate to [crontab.guru](https://crontab.guru/) and create a string that best represents how often you want to back up. For me, I'll go with hourly, so my string is `0 * * * *`.
3. Run `crontab -e` and add a job that says `0 * * * * backup`.
4. Save and exit.

Your cron job will now run regularly using system timers!
