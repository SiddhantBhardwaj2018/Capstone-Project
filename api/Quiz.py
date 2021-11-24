import random

#ToDo: check correct answers
quiz_data = [{"Question":"When was Tezos Created?","Answers":['2014','2012','2009','2019']},
             {"Question":"What is FTX Token’s abbreviation?","Answers":['TokenX','FToken','FTXCoin','FTX']},
             {"Question":"As of 2021, Solana hit an all time high in what year?","Answers":['2020','2021','2017','2019']},
             {"Question":"The Waves Cryptocurrency has what shape on its logo image?","Answers":['Diamond (or Square)','Tree','Gold Coin','Hearts']},
             {"Question":"The founder of Cardano was the Co-Founder for which coin?","Answers":['Solana','Filecoin','Ethereum','Cosmos']},
             {"Question":"PancakeSwap allows users to ________.","Answers":['Exchange tokens','Transmit Money','Trade Cryptocurrency','Earn Interest']},
             {"Question":"Polkadot has what symbol on its logo image?","Answers":['Polkadot Imagery','Christmas Tree','A Star Sign followed by the word P','The letter P followed by a Period']},
             {"Question":"Which coin has an atom for its logo image?","Answers":['Cosmos','Ardor','FTX Token','Tezos']},
             {"Question":"When was Ardor Created?","Answers":['2018','2020','2015','2012']},
             {"Question":"As of 2021, TerraUSD hit an all time high in what year?","Answers":['2021','2020','2016','2013']},
             {"Question":"What is Polygon’s abbreviation?","Answers":['MATIX','POLYG','MATIC','POLYX']},
             {"Question":"The color scheme for Avalanche is _________.","Answers":['Blue & Gold','Green & Red','Red & White','Stripes of Black & White']},
             {"Question":"Who founded Filecoin?","Answers":['Satoshi Nakamoto','Erik Voorhees','Juan Benet','Jordan Kelley']},
             {"Question":"Uniswap is most like which coin?","Answers":['FileCoin','DogeCoin','PancakeSwap','RoboCoin']},
             {"Question":"What coin is Chainlink built on?","Answers":['Ethereum','Bitcoin','LiteCoin','Cardano']},
             {"Question":"Elrond abbreviation is _________.","Answers":['EGLD','ELRD','ERLD','ELGD']},
             {"Question":"Olympus (OHM) aims to become a decentralized _______ currency.","Answers":['International','World','Reserve','National']},
             {"Question":"Who founded THORChain?","Answers":['Mark Andressen','Erik Voorhees','Vitalik Buterin','Elon Musk']},
             {"Question":"Lisk aims to make blockchain technology more accessible with a SDK written in what language?","Answers":['Python','Java','Javascript','C++']},
             {"Question":"Persistence creates what kinds of products?","Answers":['Next-gen financial products','Technical Applications for Real World','Improvements in Quality of Life','Security and Stability']},]

correct_ans = {"When was Tezos Created?":"2014",
               "What is FTX Token’s abbreviation?":"FTX",
               "As of 2021, Solana hit an all time high in what year?":"2021",
               "The Waves Cryptocurrency has what shape on its logo image?":"Diamond (or Square)",
               "The founder of Cardano was the Co-Founder for which coin?":"Ethereum",
               "PancakeSwap allows users to ________.":"Exchange tokens",
               "Polkadot has what symbol on its logo image?":"The letter P followed by a Period",
               "Which coin has an atom for its logo image?":"Cosmos",
               "When was Ardor Created?":"2018",
               "As of 2021, TerraUSD hit an all time high in what year?":"2021",
               "What is Polygon’s abbreviation?":"MATIC",
               "The color scheme for Avalanche is _________.":"Red & White",
               "Who founded Filecoin?":"Juan Benet",
               "Uniswap is most like which coin?":"PancakeSwap",
               "What coin is Chainlink built on?":"Ethereum",
               "Elrond abbreviation is _________.":"EGLD",
               "Olympus (OHM) aims to become a decentralized _______ currency.":"Reserve",
               "Who founded THORChain?":"Erik Voorhees",
               "Lisk aims to make blockchain technology more accessible with a SDK written in what language?":"Javascript",
               "Persistence creates what kinds of products?":"Next-gen financial products"}

def send_questions():
    indexes = random.sample(range(0,20),5)
    ans = [quiz_data[i] for i in indexes]
    return ans

def generate_score(responses, user_accounts, uid):
    count = 0
    for response in responses:
        if responses[response] == correct_ans[response]:
            count += 1
    if(count / 5 >= 0.80):
        doc = user_accounts.document(uid)
        updated_vc = float(doc.get(field_paths={'amount_balance'}).to_dict().get('amount_balance')) + 25
        doc.update({'amount_balance' : updated_vc})
    return count / 5
