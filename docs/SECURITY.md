# Security Policy

-----

![HitCount](http://hits.dwyl.com/gideontong/Amy.svg)

[Return to main README](README.md)

-----


## Supported Versions

The following table shows which versions still recieve security updates. As always, the latest version will also recieve feature updates.

| Version | Supported          |
| ------- | ------------------ |
| 3.2.x   | :white_check_mark: |
| 3.1.x   | :white_check_mark: |
| < 3.1   | :x:                |

As 1.3.x is considered end of life, it will no longer recieve feature updates. However, additional security patches will be added as they are reported.

If you are looking to deploy, deploy the latest build of version 1.3.x with the expectation to deploy 2.0.x when it releases. They will be both backwards and forwards compatible in configuration and data storage, as the version jump is due to a large addition in features. Reverting versions without backup will not result in failure to run the software, but it may cause sluggish performance or console.log stdout spam.

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

If you find a vulnerability, feel free to use the [issue tracker](https://github.com/gideontong/Amy/issues) to report a bug. If it is a severe vulnerability that may allow something like RCE (remote code execution), email it to me at [gideon@gideontong.com](mailto:gideon@gideontong.com) instead. If you wish you encrypt your emails, you can reach me at [gideontong@protonmail.com](gideontong@protonmail.com).

Sign your emails with the following key:

```bash
-----BEGIN PGP PUBLIC KEY BLOCK-----
xsBNBFygFKIBCAC5APtHaFysyyybjWB5NF/4qW7o2dA7ClxgpaXY+lk6gfJ8
ZR72MvlRcHztUs3oaOZdMRwFZLplqFzCLnpWOTnqCE9tLUhhxqUpe20SYjz8
hhnTSZknlydqICJygtFd283SM19q2FCgO4QGYvfWKwktah3r4yWu0hHR2z1f
V1vPnCKm6Tj3u9ZuslCHMTHpUWf47+hCSw4KjkIrdFFpD3hpb+zGTd1aRAS+
Nx9QBnqSxRS/JfLFqe3LDj9w/LsJA29r9FkRng8cAsN+m39wst4C06Xv8nOI
Ob6ALUP0vyu5amd1ImU9jl4pOc0gkj8ZOizVPl6D3+l8C43bFD4Kn7ajABEB
AAHNNyJnaWRlb250b25nQHByb3Rvbm1haWwuY29tIiA8Z2lkZW9udG9uZ0Bw
cm90b25tYWlsLmNvbT7CwHUEEAEIAB8FAlygFKIGCwkHCAMCBBUICgIDFgIB
AhkBAhsDAh4BAAoJEFxccyogf+mfZK0H/RcSW8el77DJpSNlin0hTCrZeoLq
vikbFqIGNhSURUloYGrFrcOaMzMSblbqxyZ2bzm00zrvTTplo+UW7DdctaKE
p2dlKFZMvIeEi4cAooXYYAKoD9qIMEnTbSD+wMp9qOE+29hO1axT2unXiO4Q
Z1zynV6YpxoxE0RFTnO4mh5E960hn8RpyDJMm6ReJ4MvXcCXkpSP8y3FvZtl
AHh5SmEwaAJoOBu0DBAwo821CaFEh2vtDdTQsEA2AxKXgen7ZK0h4X6czeAp
s1X686XqE+piUNfYHNw5XP4b8aXskTmOeiSLPP8oHvuty4k+7EBJbYCbyPhS
PRgK2M6ulnk5A/jOwE0EXKAUogEIAJ1TDFHi2Jo5N64W9iLpghv5g4rV1jSf
08STsJpnnCzym7TXwk3wbdPnv0+1swjm5eEdfY8ruaeJXbzGlI+tYUFmhneQ
6xLSDFeF5yaTMEKIjjF2pqXT2oyJNwhDVX6LJiv5quIqfVKLRBPPcE6OsQuq
9SOt2P7pTwgPn0XyvuGkz7Qon0fzZ6G5c7h78sDHsfQPNvKVZnT9nDG7E5bM
JzB5qQ3/e1Zeqh2o64bgzbEhBqgQ50xag3TYEKKaUWiLsVxnT8lgxq1U/Mdg
ko3gofwE6fRJUXtgvLE1AGKF0Fh64ZJwUTNKHpOARiEBmhtjhLNn3YefaYQM
XIerYh44rFMAEQEAAcLAXwQYAQgACQUCXKAUogIbDAAKCRBcXHMqIH/pny0f
B/9YvF167tL41NiUtZYJpJKIVXcNC2r9jKALHxV+ji8Ylh3wIiJxs4+72m/5
Svqtp2ae9DGCdHeRhNQaBON/cCxNhSd0SLH+POhPUwuNPAtKDdoJRSdhmdcB
WtS+XYB4kcsYnH5c4Hyp+SphlyS4jIcI1nigGbwhbhXbHtygZeu6CYVTkw53
McwC/rfGf9cjYE4hvC00gSw5zAUzMc2F7mLj17HfYfxHmOl3NZ9yKmyIwCaH
nWIhHVlnDLomLffiI1amPMRqbM6PG+BZHbtGiRCG4wUIZ//ib3DnS0qNd94r
eNhxckVFZD2iieJ0oCgEHA6t0vp3GZ+jblbfMQNzsyID
=p6bO
-----END PGP PUBLIC KEY BLOCK-----
```
