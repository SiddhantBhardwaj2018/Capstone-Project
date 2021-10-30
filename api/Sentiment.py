import tweepy
from textblob import TextBlob
import re
import pandas as pd
import numpy as np
import random


consumerKey = 'oklCH2ExkD4yt8lFZdoOXQAH1'
consumerSecret = 'QMVFbTFc7keZTJmpCHCXp5c3Itc2AfKqNJDozcAvTYSP086Hqz'
accessToken = '1450563164043575296-nx8ra7N65CNWCLq7P4YMTS2kG0yYz5'
accessTokenSecret = 'V6HSYqwknAaXaXBhCs1I911n69VvdJpzrJnfkHCoFtng3'

authenticate = tweepy.OAuthHandler(consumerKey,consumerSecret)
authenticate.secure = True
authenticate.set_access_token(accessToken,accessTokenSecret)

api = tweepy.API(authenticate,wait_on_rate_limit = True)

def cleanTxt(text):
    text = re.sub(r'@[A-Za-z0-9]+','',text)
    text = re.sub(r'#','',text)
    text = re.sub(r'RT[\s]+','',text)
    text = re.sub(r'https?:\/\/\S+','',text)
    return text

def getPolarity(text):
    return TextBlob(text).sentiment.polarity

def get_data(topic):
    posts = api.user_timeline(screen_name = topic,count = 100,tweet_mode = "extended")
    df = pd.DataFrame([tweet.full_text for tweet in posts],columns=['Tweets'])
    df['Tweets'] = df['Tweets'].apply(cleanTxt)
    df['Polarity'] = df['Tweets'].apply(getPolarity)
    return df

def get_analysis(score):
    if score < 0:
        return 'Negative'
    elif score == 0:
        return 'Neutral'
    else:
        return "Positive"
    
def final_results():
    coins = ["Cardano","Cosmos","Algorand","TRON","Tezos","EOS","Waves","THORChain","Decred","Qtum","ICON","Ontology","Lisk","Orbs","Ardor","Function X","Oasis Network","Ark","Solana","Polkadot","Avalanche","Uniswap","Chainlink","Polygon","Filecoin","FTX Token","Theta Network","eCash","PancakeSwap","Elrond","Quant","Theta Fuel","Celsius Network","BitTorrent","Celo","Olympus","Harmony","Flow","Telcoin","REN","Celer Network","Nano","Hedera Hashgraph","Fantom","Kusama","NEO","TerraUSD","Rocket Pool","Persistence","Unibright"]
    arr = random.sample(coins,5)
    d = {}
    for topic in arr:
        data = get_data(topic)
        mean_polarity = data['Polarity'].mean()
        score = get_analysis(mean_polarity)
        d[topic] = score
    print(d)
    return d
    
if __name__ == "__main__":
    final_results()