from sys import version_info

MANDATORY_VERSION = (3, 7)
assert version_info >= MANDATORY_VERSION

from server import webserver

if __name__ == '__main__':
    webserver.run(host='0.0.0.0', port=7075)