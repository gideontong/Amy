# Amy

from lib import *
import speech_recognition as sr # Speech Recognition
import getopt, sys # Program Arguments

MIN_PYTHON = (3, 9)

def versionCheck():
    if sys.version_info < MIN_PYTHON:
        sys.exit("Python %s.%s or later is required.\n" % MIN_PYTHON)

def main():
    versionCheck()

    r = sr.Recognizer()
    mic = sr.Microphone()

    with mic as source:
        audio = r.listen(source)

    text = r.recognize_google(audio)
    print(text)

main()