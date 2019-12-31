import json
import wolframalpha

with open('./config/keys.json') as keystore:
    keys = json.load(keystore)

client = wolframalpha.Client(keys['wolfram'])

def query(query):
    res = client.query(query)
    return next(res.results).text
