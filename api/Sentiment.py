from textblob import TextBlob
import re
import pandas as pd
import numpy as np
import random
import praw

r = praw.Reddit(client_id='_cEfvyvPfurA_qO2eawdaA',
                client_secret='ZJJv6q3UJCLX1vhXpNXvhIXigX0S_A',
                user_agent='CrypticApplication')

def cleanTxt(text):
    text = re.sub(r'@[A-Za-z0-9]+','',text)
    text = re.sub(r'#','',text)
    text = re.sub(r'RT[\s]+','',text)
    text = re.sub(r'https?:\/\/\S+','',text)
    return text

def getPolarity(text):
    return TextBlob(text).sentiment.polarity

def get_data(topic):
    page = r.subreddit(topic)
    top_posts =  page.top(limit=3)
    lst = []
    for post in top_posts:
        for comments in post.comments:
            lst.append(comments.body)
    df = pd.DataFrame(lst,columns=['Comments'])
    df['Comments'] = df['Comments'].apply(cleanTxt)
    df['Polarity'] = df['Comments'].apply(getPolarity)
    return df

def get_analysis(score):
    if score < 0:
        return 'Negative'
    elif score == 0:
        return 'Neutral'
    else:
        return "Positive"
    
def final_results():
    coins = ['Cardano', 'Algorand', 'Cosmosnetwork', 'Tronix', 'Tezos', 'Eos', 'hashgraph', 
             'Wavesplatform', 'THORChain', 'decred', 'icon', 'Qtum', 'ONT', 'Lisk', 'Ardor',
             'oasislabs', 'hivenetwork', 'arkcoin', 'TomoChain', 'Tenset', 'Steemit', 'Wanchain', 
             'BitShares', 'woonkly', 'pivx', 'nulstrader', 'XX_platform', 'v_systems', 'QWLA', 
             'SpaceToken', 'Stakenet', 'UBIXNetwork', 'ElectraProtocol', 'SOMIDAX', 'Lanceria',
             'AliasCash', 'BlackHat_Coin', 'LosslessToken', 'MoonStarOfficial', 'SheepToken', 
             'Emojicrypto']    
    arr = random.sample(coins,5)
    d = {}
    for topic in arr:
        data = get_data(topic)
        mean_polarity = data['Polarity'].mean()
        score = get_analysis(mean_polarity)
        d[topic] = score
    return d
    
if __name__ == "__main__":
    final_results()