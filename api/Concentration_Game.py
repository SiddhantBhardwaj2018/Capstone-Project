#THIS IS GOING TO BE THE CONCENTRATION VIDEO GAME
import requests,json,random
import numpy

def retrieve_images():
    r = requests.get(url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false")
    checklist = ["Cardano","Cosmos","Algorand","TRON","Tezos","EOS","Waves","THORChain","Decred","Qtum","ICON","Ontology","Lisk","Orbs","Ardor","Function X","Oasis Network","Ark","Solana","Polkadot","Avalanche","Uniswap","Chainlink","Polygon","Filecoin","FTX Token","Theta Network","eCash","PancakeSwap","Elrond","Quant","Theta Fuel","Celsius Network","BitTorrent","Celo","Olympus","Harmony","Flow","Telcoin","REN","Celer Network","Nano","Hedera Hashgraph","Fantom","Kusama","NEO","TerraUSD","Rocket Pool","Persistence","Unibright"]
    """
    r.raise_for_status()  # raises exception when not a 2xx response
    if r.status_code != 204:
        return r.json()
    """
        
    ans = json.loads(r.content)
    lst = []
    
    #TODO: Change this Value to 10
    checklist_updated = random.sample(checklist, 10)
    #print(checklist_updated)

    for coin_data in ans:
        if(coin_data['name'] in checklist_updated):
            name = coin_data['name']
            image = coin_data['image']
            imgObject = {"name":name,"image":image}
            lst.append(imgObject)
    #img_arr = numpy.asarray(lst)
    #return img_arr
    return lst

def update_user_vc(user_accounts, reward_data):
    uid = reward_data["uid"]
    game_reward = reward_data["vc_reward"]
    doc = user_accounts.document(uid)
    updated_vc = float(doc.get(field_paths={'amount_balance'}).to_dict().get('amount_balance')) + game_reward
    doc.update({'amount_balance' : updated_vc}) 