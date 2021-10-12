from flask import Flask, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
from flask import request
import Market

import Information

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)


db = firestore.client()
user_accounts = db.collection("users")
app = Flask(__name__)


def dummy_add_db(user_account = user_accounts):
    data = {'username':'ChunkyMan','password':'Chunky123','firstName':'Chunky','lastName':'Man','wallet':[{'crypto':"Bitcoin",'amount_owned':400,'purchase_price':37},{'crypto':"Ethereum",'amount_owned':300,'purchase_price':23}],'profit':50,'currency':20}
    user_account.document().set(data)
    
@app.route("/Home")
def get_home_page():
    return {'home':"This is the Home Page"}
    
@app.route("/Information")
def get_information_page():
    return {'property':50}


@app.route("/Leaderboard")
def get_leaderboard_page():
    return {'leaderboard':"This is the Leaderboard Page"}
    
@app.route("/Market")
def get_market_page():
    return {'Market':Market.checking()}

@app.route("/News")
def get_news_page():
    return {'news':"This is the News Page"}
        
@app.route("/Wallet")
def get_wallet_page():
    return {'Wallet':"This is the Wallet Page"}

@app.route("/Create_User")
def create_user():
    email = request.args.get('email')
    password = request.args.get('password')
    user = auth.create_user(email = email,password = password)