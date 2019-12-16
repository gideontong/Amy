from datetime import datetime
import pafy
import vlc

url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
video = pafy.new(url)
print("got url")
length = video.duration
print("video is", length, "seconds long")
best = video.getbest()
# print("got best")
playurl = best.url
# print("url should be", playurl)

Instance = vlc.Instance()
print("started vlc instance")
player = Instance.media_player_new()
Media = Instance.media_new(playurl)
# print("here's an instance")
Media.get_mrl()
player.set_media(Media)
# print("set media")
player.play()
print("should've played")

# This is actually a really janky way of closing the thread. It works
# by simply counting the number of seconds the video should've run
# and then ending the thread. A better way would be to hook into the
# VLC runtime, but that would require me to look at the API and docs
# first and I'm lazy.

# Still need to hide the video


start = datetime.now()
elapsed = datetime.now() - start
print(elapsed.total_seconds())

while elapsed.total_seconds() < length + 20:
    elapsed = datetime.now() - start
    # if elapsed.total_seconds() % 10 == 0:
    print("elasped", elapsed.total_seconds(), "seconds")
    pass
