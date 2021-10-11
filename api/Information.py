"""TODO: tell whether user has clicked the buy or sell submit button and
        retrieve the value from the slider as well as the user's username
        by using a cookie or session"""

def process_transaction(user_accounts, trade_data):
    #trade_data = request.json["trade"]
    coin_name = trade_data["coin_name"]
    method = trade_data["method"]
    transaction_amount_usd = trade_data["amount"]
    username = trade_data["username"]
    date_of_transaction = trade_data["date"]
    cp_of_transaction = trade_data["current_price"]
    
    doc = user_accounts.document(username)
    transacted_coins = transaction_amount_usd / cp_of_transaction

    Wallet = doc.get("Wallet")
    #TODO: would this be as below or doc.get("Wallet"[coin_name]) [[STACK OVERFLOW SAYS IT IS]]
    Coin_in_Wallet = doc.get(Wallet[coin_name])
    Amount_of_Coin_in_Wallet = doc.get(Wallet[coin_name]["current_amount"])

    if(method == "Buy"):
        #IF THE USER ALREADY OWNS A CERTAIN CRYPTO
        if(Coin_in_Wallet.exists):
            updated_coins = Amount_of_Coin_in_Wallet + transacted_coins
            #TODO: I could write code below as: Amount_of_Coin_in_Wallet.update(updated_coins)
            Coin_in_Wallet.update({"current_amount" : updated_coins})
            #TODO: Add Receipt of Transaction HERE!!!!!!
        #IF THE USER DOES NOT ALREADY OWN THAT CERTAIN CRYPTO
        else:
            Wallet.update({coin_name : {"current_amount" : transacted_coins}})
            #TODO: Add Receipt of Transaction HERE!!!!!!
    else:
        updated_coins = Wallet[coin_name]["Amount"] - transacted_coins
        #TODO: I could write code below as: Amount_of_Coin_in_Wallet.update(updated_coins)
        Coin_in_Wallet.update({"current_amount" : updated_coins})
        #TODO: Add Receipt of Transaction HERE!!!!!!

    
    #doc.update(wallet_update)
    date_changed = Wallet[coin_name]["date_bought"]

def create_transaction_receipt(Wallet):
    pass

def get_wallet_vc(user_accounts, username):
    vc = user_accounts.document(username).get("virtual_currency")
    return vc