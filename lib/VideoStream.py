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
player.stop()

# Still need to hide the video