from flask import Flask, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import Information

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
user_accounts = db.collection("user_account_table")
app = Flask(__name__)
    

def dummy_add_db(user_account = user_accounts):
    data = {'username':'ChunkyMan','password':'Chunky123','firstName':'Chunky','lastName':'Man','wallet':[{'crypto':"Bitcoin",'amount_owned':400,'purchase_price':37},{'crypto':"Ethereum",'amount_owned':300,'purchase_price':23}],'profit':50,'currency':20}
    user_account.document().set(data)
    
@app.route("/Home")
def get_home_page():
    return {'home':"This is the Home Page"}
    
@app.route("/Information")
def get_information_page():
    """If buy/sell form is completed the transaction is then processed on the 
    back-end by talking to the database and adjusting the user's wallet according
    to the amount of crypto purchased with virtual currency."""
    if(request.method == 'POST'):
        """TODO: tell whether user has clicked the buy or sell submit button and
        retrieve the value from the slider as well as the user's username
        by using a cookie or session"""
        transaction_amount = request.form.get('transaction_submit')
        return {'info': Information.process_transaction(transaction_amount)}
    
    """retrieves the amount of virtual currency so front-end
    can display a slider with min to max of tradable virtual currency"""
    return {'info': Information.retrieve_virtual_currency()}


@app.route("/Leaderboard")
def get_leaderboard_page():
    return {'leaderboard':"This is the Leaderboard Page"}
    
@app.route("/Market")
def get_market_page():
    return {'Market':"This is the Market Page"}

@app.route("/News")
def get_news_page():
    return {'news':"This is the News Page"}
    
@app.route("/Setting")
def get_setting_page():
    return {'setting':"This is the Setting Page"}
    
@app.route("/Wallet")
def get_wallet_page():
    return {'Wallet':"This is the Wallet Page"}

