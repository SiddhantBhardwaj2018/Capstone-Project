from flask import Flask, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import SignIn


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
    return {'info':"This is the Information Page"}

@app.route("/Leaderboard")
def get_leaderboard_page():
    return {'leaderboard':"This is the Leaderboard Page"}
    
@app.route("/Market")
def get_market_page():
    return {'Market':"This is the Market Page"}

@app.route("/News")
def get_news_page():
    return {'news':"This is the News Page"}
    
@app.route("/SignIn")
def get_setting_page():
    if(request.method == 'POST'):
        username = request.form.get('username')
        password = request.form.get('password')
        return {'signin': SignIn.process_login(username, password)}

@app.route("/SignUp")
def get_setting_page():
    return {'signup':"This is the SignUp Page"}

@app.route("/ForgetPassword")
def get_setting_page():
    return {'forgetpassword':"This is the Forget Password Page"}
    
@app.route("/Wallet")
def get_wallet_page():
    return {'Wallet':"This is the Wallet Page"}

