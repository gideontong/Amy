import speech_recognition as sr

r = sr.Recognizer()

record = sr.AudioFile('audio.wav')
with record as source:
    audio = r.record(source)

text = r.recognize_google(audio)