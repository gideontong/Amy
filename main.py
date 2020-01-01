# Amy

from lib import *
import speech_recognition as sr # Speech Recognition
import getopt, sys # Program Arguments

from gtts import gTTS
from playsound import playsound

MIN_PYTHON = (4, 0)

def versionCheck():
    if sys.version_info < MIN_PYTHON:
        sys.exit("Python %s.%s or later is required.\n" % MIN_PYTHON)

def main():
    argumentList = sys.argv[1:]
    unixOptions = "hvte"
    gnuOptions = ["help", "verbose", "test", "exert"]

    try:
        arguments, values = getopt.getopt(argumentList, unixOptions, gnuOptions)
    except getopt.error as err:
        print(str(err))
        sys.exit(2)

    for argument, value in arguments:
        if argument in ("-v", "--verbose"):
            print("--verbose was run! Nothing was done!")
        if argument in ("-t", "--test"):
            print("hi")
            test = Calculator.query("1 + 4")
            print(test)
        if argument in ("-e", "--exert"):
            global MIN_PYTHON
            MIN_PYTHON = (3, 8)
        else:
            print("Nothing was run! Nothing was done!")

    versionCheck()

    r = sr.Recognizer()
    mic = sr.Microphone()

    with mic as source:
        audio = r.listen(source)

    text = r.recognize_google(audio)
    print(text)

    tts = gTTS(text)
    tts.save('playback.mp3')
    playsound('playback.mp3')

main()