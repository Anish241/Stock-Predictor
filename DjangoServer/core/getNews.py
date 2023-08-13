from GoogleNews import GoogleNews
import pandas as pd
import numpy as np
import datetime
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def getNews(symbol):
    date_today = datetime.datetime.today().strftime('%Y/%m/%d')
    date_7_days_ago = (datetime.datetime.today() - datetime.timedelta(days=7)).strftime('%Y/%m/%d')
    googlenews = GoogleNews()
    print(date_today)
    print(date_7_days_ago)
    googlenews.search(symbol)
    result = googlenews.result()
    df = pd.DataFrame(result)
    titles = df['title'].tolist()
    links = df['link'].tolist()
    dates = df['date'].tolist()
    desc = df['desc'].tolist()

    return titles, links, dates, desc

def Sentiment(desc):
    sentiment = SentimentIntensityAnalyzer()
    desc_score = []
    for de in desc:
        desc_score.append(sentiment.polarity_scores(de))
    
    po = []
    ne = []
    neu = []
    for ds in desc_score:
        po.append(ds['pos'])
        ne.append(ds['neg'])
        neu.append(ds['neu'])

    po_m  = np.mean(po)
    ne_m = np.mean(ne)
    neu_m = np.mean(neu)

    return po_m, ne_m, neu_m


