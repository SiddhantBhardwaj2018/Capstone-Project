#this is wallet.py

def retrieve_assets(user_accounts, uid):
    doc = user_accounts.document(uid)
    wallet = doc.get(field_paths={'wallet'}).to_dict().get('wallet')
    #print(wallet)
    return wallet

def retrieve_trans_history(user_accounts, uid):
    trans_history = []
    doc = user_accounts.document(uid)
    receipts = doc.get(field_paths={'receipts'}).to_dict().get('receipts')
    for index in range(len(receipts) - 1, len(receipts) - 6, -1):
        trans_history.append(receipts[index])
    return trans_history