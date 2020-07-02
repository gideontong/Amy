#!/bin/python3

"""
Usage: generateIcons folderName

generateIcons will automatically find all .pngs in folderName and drop
64x64 versions in a 64 folder, 30x30 versions in a 30 folder, 
64x64 grayscale versions in a disabled64 folder, and 30x30 grayscale
versions in a disabled30 folder.
"""

import sys
from os import listdir
from PIL import Image
from pathlib import Path

path = sys.argv[1]
folders = ['64', '30', 'disabled64', 'disabled30']
for folder in folders:
    Path(path + '/' + folder).mkdir(exist_ok=True)
for file in listdir(path):
    if file.endswith('.png'):
        print('Now processing', file)
        name = Path(file).stem
        im = Image.open(path + '/' + file)
        im = im.resize((64, 64))
        im.save(path + '/64/' + name + '.png')
        im_g = im.convert('LA')
        im_g.save(path + '/disabled64/' + name + '.png')
        im = im.resize((30, 30))
        im.save(path + '/30/' + name + '.png')
        im_g = im_g.resize((30, 30))
        im_g.save(path + '/disabled30/' + name + '.png')
