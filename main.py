# Amy

from lib import *
import speech_recognition as sr # Speech Recognition
import getopt, sys # Program Arguments

MIN_PYTHON = (3, 9)

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
            print("--test was run! Nothing was done!")
        if argument in ("-e", "--exert"):
            global MIN_PYTHON
            MIN_PYTHON = (MIN_PYTHON[0], 8)
        else:
            print("Nothing was run! Nothing was done!")

    versionCheck()

    r = sr.Recognizer()
    mic = sr.Microphone()

    with mic as source:
        audio = r.listen(source)

    text = r.recognize_google(audio)
    print(text)

main()