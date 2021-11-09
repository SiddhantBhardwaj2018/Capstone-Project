import requests
import json
import random

#coins = ['ADA', 'ATOM','TRX','EOS','ADA','PIVX','ADA']

coins = ['ADA', 'ALGO', 'ATOM', 'TRX', 'XTZ', 'EOS', 'HBAR', 'WAVE', 'RUNE', 'DCR', 'ICLR', 'QTUM', 'ONT', 'LSK', 'ARDR', 'OASIS', 'HIVE', 'ARK', 'TOMO', '10SET',
         'STEEM', 'WAN', 'BTS', 'WOOP', 'PIVX', 'NULS', 'XXP', 'VSYS', 'QWLA', 'SPACE', 'XSN', 'UBX', 'XEP', 'SMDX', 'LANC', 'ALIAS', 'BLKC', 'LSS', 'MOONSTAR', 'SHEEP', 'EMOJ']

'''
for coin in range(0,5):
    random_coin = random.sample(coins, 3)
    print(random_coin)
    try:
        for coin in [random_coin]:
            data = requests.get(f'https://cryptopanic.com/api/v1/posts/?auth_token=73ee93f72da187be1ca0dc6f7e2d11b93e1bcb32&currencies={coin}')
            data = data.json()
            results = data['results'][1]
            post_data = {'title': results['title'], 'domain': results['domain'], 'published at': results['published_at']}
            print(post_data)
    except:
        pass
'''
def cryptopanic_output():
    arr = []
    random_coin = random.sample(coins, 3)
    for i in random_coin:
        try:
            data = requests.get(
                f'https://cryptopanic.com/api/v1/posts/?auth_token=73ee93f72da187be1ca0dc6f7e2d11b93e1bcb32&currencies={i}')
            data = data.json()
            results = data['results'][1]
            post_data = {'title': results['title'], 'domain': results['domain'],
                     'published at': results['published_at']}
            arr.append(post_data)
        except:
            pass
    return arr

if __name__ == "__main__":
    cryptopanic_output()