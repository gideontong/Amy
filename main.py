import speech_recognition as sr

r = sr.Recognizer()
mic = sr.Microphone()

"""
record = sr.AudioFile('audio.wav')
with record as source:
    audio = r.record(source)
"""

with mic as source:
    audio = r.listen(source)

text = r.recognize_google(audio)
print(text)