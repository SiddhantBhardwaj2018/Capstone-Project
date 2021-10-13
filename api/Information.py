"""TODO: tell whether user has clicked the buy or sell submit button and
        retrieve the value from the slider as well as the user's username
        by using a cookie or session"""

def process_transaction(user_accounts, trade_data):
    coin_name = trade_data['coin_name']
    method = trade_data['method']
    transaction_amount_vc = float(trade_data['amount'])
    uid = trade_data['uid']
    date_of_transaction = trade_data['date']
    cp_of_transaction = trade_data['price']  #Note: This is aka current price
    
    
    doc = user_accounts.document(uid)
    transacted_coins = float(transaction_amount_vc) / float(cp_of_transaction)

    Wallet = doc.get(field_paths={'wallet'})
    Wallet_dict = doc.get(field_paths={'wallet'}).to_dict()

    if(method == 'Buy'):
        if(coin_name in Wallet_dict['wallet']):
            updated_vc = float(user_accounts.document(uid).get(field_paths={'amount_balance'}).to_dict().get('amount_balance')) - transaction_amount_vc
            doc.update({'amount_balance' : updated_vc})
            updated_coins = float(Wallet_dict['wallet'][coin_name]) + float(transacted_coins)
            doc.set({'wallet': {coin_name : updated_coins}}, merge=True)
            #TODO: Add Receipt of Transaction HERE!!!!!!
        #IF THE USER DOES NOT ALREADY OWN THAT CERTAIN CRYPTO
        else:
            updated_vc = float(user_accounts.document(uid).get(field_paths={'amount_balance'}).to_dict().get('amount_balance')) - transaction_amount_vc
            doc.update({'amount_balance' : updated_vc}) 
            doc.set({'wallet': {coin_name : transacted_coins}}, merge=True)
            #TODO: Add Receipt of Transaction HERE!!!!!!
    else:
        if(float(Wallet_dict['wallet'][coin_name]) - float(transacted_coins) >= 0):
            #print("I'm in the sell method")
            updated_coins = float(Wallet_dict['wallet'][coin_name]) - float(transacted_coins)
            doc.set({'wallet': {coin_name : updated_coins}}, merge=True)
            updated_vc = float(user_accounts.document(uid).get(field_paths={'amount_balance'}).to_dict().get('amount_balance')) + transaction_amount_vc
            doc.update({'amount_balance' : updated_vc})
            #print("Sale was completed!")
            #TODO: Implement Profit calculation here
            #TODO: Add Receipt of Transaction HERE!!!!!!

    
    

def retrieve_virtual_currency(user_accounts, uid):
    vc_buy = user_accounts.document(uid).get(field_paths={'amount_balance'}).to_dict().get('amount_balance')
    #vc_sell = float(doc.get(field_paths={'wallet'}).to_dict()['wallet'][coin_name]) * current_price
    #return {'buy' : vc_buy, 'sell' : vc_sell}
    return vc_buy