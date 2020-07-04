# Setup

> If you are a contributor, or you are looking for someting to contribute to, a guide on how to set up Amy for development (more detailed, and OS-specific instructions) would be greatly appreciated!

-----

![HitCount](http://hits.dwyl.com/gideontong/Amy.svg) • [Return to main README](../README.md)

-----

## Server Managers

Clone to your server, then insert `secrets.json` and install with `npm ci`. Run with `npm start`.

## Developers

Instead of installing with

```bash
npm install --production
```

use

```bash
npm install
```

instead, as it will also install dependencies only used at runtime.
