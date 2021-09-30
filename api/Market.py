from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()
print(len(cg.get_price(ids= ['Cardano', 'Algorand', 'Cosmos', 'TRON', 'Tezos', 'EOS', 'Hedera Hashgraph', 'Waves', 'THORChain', 'Decred', 'ICON', 'Qtum', 'Ontology', 'Lisk', 'Ardor', 'Oasis Network', 'Hive Token', 'Ark', 'TomoChain', 'Tenset', 'Steem', 'Wanchain', 'BitShares', 'WOONKLY POWER', 'PIVX', 'Nuls', 'XX Platform', 'V Systems', 'Qawalla Token', 'Space Token', 'Stakenet', 'Million', 'UBIX.Network', 'Electra Protocol', 'BitcoinTrust', 'SOMIDAX', 'Lanceria', 'Alias', 'Albetrage', 'BlackHat', 'Lossless Protocol', 'Moonstar', 'CREED', 'Nexalt', 'Hydra', 'Masternode Hype Coin Exchange', 'Global DeFi', 'SheepToken', 'Emoji', 'Recast1 Token'], vs_currencies='usd')))
