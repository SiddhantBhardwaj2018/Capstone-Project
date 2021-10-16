
def generate_leaderboard(db,uid):
    docs = db.stream()
    d = []
    ranks = []
    for doc in docs:
        doc = doc.to_dict()
        print(doc.keys())
        coins = {}
        for receipt in doc['receipts']:
            if receipt['method'] == 'Sell':
                if receipt['asset'] not in coins:
                    coins[receipt['asset']] = 1
                else:
                    coins[receipt['asset']] += 1
        if len(list(coins.keys())) == 0:
            coin = "Not Available"
        else:
            coin = sorted([item for item in coins.items()],key = lambda tup:tup[1],reverse = True)[0][0]
        ranks.append({"name": doc['firstname'] + ' ' + doc['lastname'],"profit":  doc['profit'], "most_traded_coin":coin,"amount_balance":doc["amount_balance"],"uid":doc["uid"]})
    ranks = sorted(ranks,key = lambda item:item['profit'],reverse = True)
    item = None
    for idx,position in enumerate(ranks):
        if position['uid'] == uid:
            if idx >= 10:
                item = position
            else:
                position["rank"] = idx + 1
        else:
            if idx < 10:
                position["rank"] = idx + 1
    ranks = ranks[:10]
    if item is not None:
        ranks.append(item)
    return ranks

if __name__ == "__main__":
    generate_leaderboard()