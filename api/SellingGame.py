#this is selling game.py

def process_reward(user_accounts, uid):
    try:
        doc = user_accounts.document(uid)
        updated_vc = float(doc.get(field_paths={'amount_balance'}).to_dict().get('amount_balance')) + 100
        doc.update({'amount_balance' : updated_vc})
        return "successful"
    except:
        return "unsuccessful"
    
