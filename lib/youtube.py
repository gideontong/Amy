from youtube_dl import YoutubeDL
import urllib.request
import urllib.parse
import re
import pafy
import vlc

url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
video = pafy.new(url)
print("got url")
best = video.getbest()
print("got best")
playurl = best.url
print("url should be", playurl)

Instance = vlc.Instance()
print("started vlc instance")
player = Instance.media_player_new()
Media = Instance.media_new(playurl)
print("here's an instance")
Media.get_mrl()
player.set_media(Media)
print("set media")
player.play()
print("should've played")

while True:
    pass

"""
query_string = urllib.parse.urlencode({"search_query" : input()})
html_content = urllib.request.urlopen("http://www.youtube.com/results?" + query_string)
search_results = re.findall(r'href=\"\/watch\?v=(.{11})', html_content.read().decode())
uri = "http://www.youtube.com/watch?v=" + search_results[0]

print(uri)


video = pafy.new(uri)
bestaudio = video.getbestaudio()
bestaudio.download()
#playurl = best.url
"""

"""
downloadOptions = {
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '128'
    }]
}
with YoutubeDL(downloadOptions) as ydl:
    ydl.download([uri])
"""