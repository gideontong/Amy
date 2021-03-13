'''
Download Nerdwallet city data
'''

from argparse import ArgumentParser
from json import dump, load
from requests import post
from time import sleep


url = "https://api.nerdwallet.com/homeownership/v1/cost-of-living/city-data?client_id=diy-tools-hac"
headers = {
    'authority': 'api.nerdwallet.com',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
    'accept': 'application/json',
    'dnt': '1',
    'sec-ch-ua-mobile': '?0',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    'content-type': 'application/json',
    'origin': 'https://www.nerdwallet.com',
    'sec-fetch-site': 'same-site',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://www.nerdwallet.com/',
    'accept-language': 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7',
    'sec-gpc': '1'
}


def parse_args():
    parser = ArgumentParser()
    parser.add_argument('-c', '--cities')
    parser.add_argument('-o', '--output')
    args = parser.parse_args()
    return args.cities, args.output


def load_cities(fp):
    data = load(open(fp))
    cities = list()
    for city in data['cities']:
        print('loading', city['id'])
        cities.append(city['id'])
    return cities


def yield_data(arr):
    payload = {
        'ids': arr
    }
    print('downloading', arr)
    response = post(url, headers=headers, json=payload)
    return response.json()


def combine_data(data, arr):
    for city in arr:
        data[city['slug']] = city
    return data


if __name__ == '__main__':
    city_file, output = parse_args()
    cities = load_cities(city_file)
    data = dict()
    while len(cities) > 0:
        next_cities = cities[:5]
        cities = cities[5:]
        arr = yield_data(next_cities)
        sleep(1)
        data = combine_data(data, arr)
    dump(data, open(output, 'w', encoding='utf-8'), indent=4, sort_keys=4)
