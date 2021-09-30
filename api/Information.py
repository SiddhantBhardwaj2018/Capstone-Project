from pycoingecko import CoinGeckoAPI

#This is the Information.py file 
cg = CoinGeckoAPI()
print(len(cg.get_price(ids= ['Cardano', 'Algorand', 'Cosmos', 'TRON', 'Tezos', 'EOS', 'Orbs', 'Waves', 'THORChain', 'Decred', 'ICON', 'Qtum', 'Ontology', 'Lisk', 'Ardor', 'Plex', 'Function X', 'Ark', 'TomoChain', 'Tenset', 'Steem', 'Wanchain', 'BitShares', 'Oasis Network', 'PIVX', 'Nuls', 'Verasity', 'DUSK Network', 'Navcoin', 'Neblio', 'Stakenet', 'Million', 'Peercoin', 'NXT', 'Stakecube', 'DataHighway', 'Lanceria', 'Blocknet', 'BlackCoin', 'VAULT', 'NIX', 'Tokenize Xchange', 'CREED', 'Nexalt', 'Hydra', 'Bitball Treasure', 'RAKON', 'Trading Pool Coin', 'GICTrade', 'MONGO Coin'], vs_currencies='usd')))