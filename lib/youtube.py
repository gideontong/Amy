from youtube_dl import YoutubeDL

uri = ''
downloadOptions = {}
with YoutubeDL(downloadOptions) as ydl:
    ydl.download([uri])