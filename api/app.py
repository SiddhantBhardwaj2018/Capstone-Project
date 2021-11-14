from flask import Flask, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import request
import Market
import Information
import Leaderboard
import Quiz
import SellingGame
import Sentiment
import crryptopanic_api
import reddit_api_praw
import Concentration_Game
import Wallet
import Wallet_Graph

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
    
@app.route("/Information",methods = ['GET','POST'])
def get_information_page():
    """If buy/sell form is completed the transaction is then processed on the 
    back-end by talking to the database and adjusting the user's wallet according
    to the amount of crypto purchased with virtual currency."""
    if(request.method == 'GET'):
        """retrieves the amount of virtual currency so front-end
        can display a slider with min to max of tradable virtual currency"""
        #print("inside retrive vc get")
        return {'info': Information.retrieve_virtual_currency(user_accounts, request.args.get("uid"), request.args.get("coin_name"))}
    if(request.method == 'POST'):
        #print("Before transaction")
        try:
            Information.process_transaction(user_accounts, request.json["trade"])
            return {'info_trade' : 'Successfully traded'}
        except:
            return {'info_trade' : 'Unsuccessfully traded'}


@app.route("/Leaderboard")
def get_leaderboard_page():
    uid = request.args['uid']
    ans = Leaderboard.generate_leaderboard(user_accounts,uid)
    return {'Leaderboard':ans}
    
@app.route("/Market")
def get_market_page():
    return {'Market':Market.checking()}

@app.route("/News")
def get_news_page():
    reddit_info = reddit_api_praw.reddit_output()
    #crryptopanic_api_info = crryptopanic_api.cryptopanic_output()
    sentiment_info = Sentiment.final_results()
    d = {'news':{"reddit_news": reddit_info},"sentiment":sentiment_info}
    return d
        
@app.route("/Wallet", methods = ["GET","POST"])
def get_wallet_page():
    if(request.method == 'POST'):
        return {'Wallet': {'transaction_history' : Wallet.retrieve_trans_history(user_accounts, request.json["wallet"]["uid"])}}

@app.route("/Quiz",methods = ["GET","POST"])
def get_quiz_game():
    if request.method == "GET":
        return {"quiz_data":Quiz.send_questions()}
    elif request.method == "POST":
        return {"score":Quiz.generate_score(request.json["responses"], user_accounts, request.args.get("uid"))}

@app.route("/SellingGame", methods = ["GET", "POST"])
def get_third_game():
    if request.method == 'POST':
        return {'SellingGame' : SellingGame.process_reward(user_accounts, request.json["reward"]["uid"])}

@app.route("/ConcentrationGame", methods = ["GET", "POST"])
def get_concentration_game():
    if(request.method == "GET"):
        return {'concentration_data': Concentration_Game.retrieve_images()}
    elif(request.method == "POST"):
        #ToDo: implementation missing in front-end under finish component
        return {'concentation_data': Concentration_Game.update_user_vc(user_accounts, request.json["reward"])}

@app.route("/Wallet_Graph",methods = ['GET'])
def get_wallet():
    uid = request.args['uid']
    return {'unique_coins':Wallet_Graph.unique_coins(user_accounts,uid)}