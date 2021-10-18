from google.cloud import firestore
from google.cloud.firestore_v1.transforms import Increment
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
            #print("GOING INTO EXISTING COIN ADDITION")
            updated_vc = float(user_accounts.document(uid).get(field_paths={'amount_balance'}).to_dict().get('amount_balance')) - transaction_amount_vc
            doc.update({'amount_balance' : updated_vc})
            updated_coins = float(Wallet_dict['wallet'][coin_name]) + float(transacted_coins)
            doc.set({'wallet': {coin_name : updated_coins}}, merge=True)
            #TODO: Add Receipt of Transaction HERE!!!!!!
            #print("GOING INTO RECIEPT")
            receipt = {'date' : date_of_transaction,'asset': coin_name, 'method': method, 'market_rate': cp_of_transaction, 'amount_purchased_in_vc' : transaction_amount_vc, 'amount_of_asset' : transacted_coins}
            #print("WORKING ON RECEIPT")
            doc.update({'receipts': firestore.ArrayUnion([receipt])})
            #print("RECEIPT COMPLETED")
        #IF THE USER DOES NOT ALREADY OWN THAT CERTAIN CRYPTO
        else:
            #print("GOING INTO NEW COIN ADDITION")
            updated_vc = float(user_accounts.document(uid).get(field_paths={'amount_balance'}).to_dict().get('amount_balance')) - transaction_amount_vc
            doc.update({'amount_balance' : updated_vc}) 
            doc.set({'wallet': {coin_name : transacted_coins}}, merge=True)
            #TODO: Add Receipt of Transaction HERE!!!!!!
            #print("GOING INTO RECIEPT")
            receipt = {'date' : date_of_transaction,'asset': coin_name, 'method': method, 'market_rate': cp_of_transaction, 'amount_purchased_in_vc' : transaction_amount_vc, 'amount_of_asset' : transacted_coins}
            #print("WORKING ON RECEIPT")
            doc.update({'receipts': firestore.ArrayUnion([receipt])})
            #print("RECEIPT COMPLETED")
    else:
        if(float(Wallet_dict['wallet'][coin_name]) - float(transacted_coins) >= 0):
            #print("GOING INTO SELL")
            #print("I'm in the sell method")
            updated_coins = float(Wallet_dict['wallet'][coin_name]) - float(transacted_coins)
            doc.set({'wallet': {coin_name : updated_coins}}, merge=True)
            updated_vc = float(user_accounts.document(uid).get(field_paths={'amount_balance'}).to_dict().get('amount_balance')) + transaction_amount_vc
            doc.update({'amount_balance' : updated_vc})
            #print("Sale was completed!")
            #TODO: Add Receipt of Transaction HERE!!!!!!
            #print("GOING INTO RECIEPT")
            receipt = {'date' : date_of_transaction,'asset': coin_name, 'method': method, 'market_rate': cp_of_transaction, 'amount_transacted_in_vc' : transaction_amount_vc, 'amount_of_asset' : transacted_coins}
            #print("WORKING ON RECEIPT")
            doc.update({'receipts': firestore.ArrayUnion([receipt])})
            #print("RECEIPT COMPLETED")
            #TODO: Implement Profit calculation here
            receipt_arr = doc.get(field_paths={'receipts'}).to_dict().get('receipts')
            profit = calculate_profit(receipt_arr,coin_name, transacted_coins, cp_of_transaction)
            doc.update({'profit': Increment(profit)})

    
#TODO: Make code cleaner
def calculate_profit(receipts, coin_name, sale_amount, current_price):
    running_sum = 0
    total_coins = 0
    for receipt in receipts:
        if(coin_name == receipt['asset']):
            total_coins += receipt['amount_of_asset']
            running_sum += (receipt['market_rate'] * receipt['amount_of_asset'])
    mean_purchase_price = running_sum / total_coins
    profit = (current_price * sale_amount) - (mean_purchase_price * sale_amount)
    return profit


def retrieve_virtual_currency(user_accounts, uid, coin_name):
    vc_buy = user_accounts.document(uid).get(field_paths={'amount_balance'}).to_dict().get('amount_balance')
    vc_sell = float(user_accounts.document(uid).get(field_paths={'wallet'}).to_dict()['wallet'][coin_name]) 
    """TODO: buy is in terms of Virtual Currency whereas sell is in terms of the coin amount
    this would still need to be multiplied on the Front End by current_Price"""
    return {'buy' : vc_buy, 'sell' : vc_sell}