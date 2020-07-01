# Security Policy

## Supported Versions

The following table shows which versions still recieve security updates. As always, the latest version will also recieve feature updates.

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.3.x   | :white_check_mark: |
| < 1.2   | :x:                |

As 1.3.x is considered end of life, it will no longer recieve feature updates. However, additional security patches will be added as they are reported. Version 2.0.x is currently in active development and is currently in beta.

If you are looking to deploy, deploy the latest build of version 1.3.x with the expectation to deploy 2.0.x when it releases. They will be both backwards and forwards compatible in configuration and data storage, as the version jump is due to a large addition in features. Reverting versions without backup will not result in failure to run the software, but it may cause sluggish performance or console.log stdout spam.

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

If you find a vulnerability, feel free to use the [issue tracker](https://github.com/gideontong/Amy/issues) to report a bug. If it is a severe vulnerability that may allow something like RCE (remote code execution), email it to me at [gideon@gideontong.com](mailto:gideon@gideontong.com) instead. If you wish you encrypt your emails, you can reach me at [gideontong@protonmail.com](gideontong@protonmail.com).
