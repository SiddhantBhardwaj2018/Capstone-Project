import requests,json

## Name,logo,price,24-hr-change-currency,24-hr-change-percent
## every coin has float value of two decimal places for all numeric columns
def checking():
    r = requests.get(url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false")
    #r1 = requests.get(url = "https://api.coingecko.com/api/v3/coins/yearn-finance?tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false"
    checklist = ["Cardano","Cosmos","Algorand","TRON","Tezos","EOS","Waves","THORChain","Decred","Qtum","ICON","Ontology","Lisk","Orbs","Ardor","Function X","Oasis Network","Ark","Solana","Polkadot","Avalanche","Uniswap","Chainlink","Polygon","Filecoin","FTX Token","Theta Network","eCash","PancakeSwap","Elrond","Quant","Theta Fuel","Celsius Network","BitTorrent","Celo","Olympus","Harmony","Flow","Telcoin","REN","Celer Network","Nano","Hedera Hashgraph","Fantom","Kusama","NEO","TerraUSD","Rocket Pool","Persistence","Unibright"]
    ans = json.loads(r.content)
    counter = 0
    lst = []
    for coin_data in ans:
        if(coin_data['name'] in checklist):
            coinId = coin_data['id']
            name = coin_data['name']
            symbol = coin_data['symbol']
            image = coin_data['image']
            current_price = coin_data['current_price']
            price_change_24h = coin_data['price_change_24h']
            price_change_percentage_24h = coin_data['price_change_percentage_24h']
            object1 = {"id":coinId, "name":name,"symbol":symbol,"image":image,"current_price":current_price,"price_change_24h":price_change_24h,
                    "price_change_percentage_24h":price_change_percentage_24h}
            lst.append(object1)
    return lst
            
if __name__ == "__main__":
    checking()