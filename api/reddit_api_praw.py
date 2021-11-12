from typing import Container
import praw
import pandas as pd
import datetime as dt
import sys
from praw import reddit
import random


coins = ['Cardano', 'Algorand', 'Cosmosnetwork', 'Tronix', 'Tezos', 'Eos', 'hashgraph', 
         'Wavesplatform', 'THORChain', 'decred', 'icon', 'Qtum', 'ONT', 'Lisk', 'Ardor',
         'oasislabs', 'hivenetwork', 'arkcoin', 'TomoChain', 'Tenset', 'Steemit', 'Wanchain', 
         'BitShares', 'woonkly', 'pivx', 'nulstrader', 'XX_platform', 'v_systems', 'QWLA', 
         'SpaceToken', 'Stakenet', 'UBIXNetwork', 'ElectraProtocol', 'SOMIDAX', 'Lanceria', 
         'AliasCash', 'BlackHat_Coin', 'LosslessToken', 'MoonStarOfficial', 'SheepToken', 
         'Emojicrypto']


r = praw.Reddit(client_id='_cEfvyvPfurA_qO2eawdaA',
                client_secret='ZJJv6q3UJCLX1vhXpNXvhIXigX0S_A',
                user_agent='CrypticApplication')


posts = []

def reddit_output():
    for coin in range(0,4):
        random_coin = random.choice(coins)
        #print(random_coin)
        try:
            page = r.subreddit(random_coin)
            top_posts = page.top(limit=3)
            for post in top_posts:
                #print(post)
                pub_date = str(dt.datetime.utcfromtimestamp(post.created_utc))
                post_data = {'title': post.title, 'redditor': post.id, 'url': post.url, 'published date': pub_date}
                #print(post_data)
                #reddit.subreddit(top_posts).submit(title='Title')
                #print('title: ', post.title, '\n', 'redditor: ', post.id, '\n', 'url: ', post.url, '\n', 'comments: ')
                cms = []
                c = 0
#if reddit post has url (wont work with reddit post) to a diffferent page use an iframe, if url contains jpg just use image tag
                for comment in post.comments:
                    cms.append(comment.body)
                    c = c + 1
                    if c >= 3:
                        break
            post_data['comments'] = cms
            posts.append(post_data)
        except:
            pass
    return posts
    
if __name__ == "__main__":
    reddit_output()