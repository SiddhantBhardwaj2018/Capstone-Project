from flask import Flask

app = Flask(__name__)

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
    
@app.route("/Setting")
def get_setting_page():
    return {'setting':"This is the Setting Page"}
    
@app.route("/Wallet")
def get_wallet_page():
    return {'Wallet':"This is the Wallet Page"}