from youtube_dl import YoutubeDL
import urllib.request
import urllib.parse
import re
import pafy


query_string = urllib.parse.urlencode({"search_query" : input()})
html_content = urllib.request.urlopen("http://www.youtube.com/results?" + query_string)
search_results = re.findall(r'href=\"\/watch\?v=(.{11})', html_content.read().decode())
uri = "http://www.youtube.com/watch?v=" + search_results[0]

print(uri)


video = pafy.new(uri)
bestaudio = video.getbestaudio()
bestaudio.download()
playurl = best.url
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