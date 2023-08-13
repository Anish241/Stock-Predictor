from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import datetime
from .Linear import calulate
from .KNN import calcK
from .getNews import getNews , Sentiment
from .getFifteen import fifteenPredict

# Create your views here.

class SymbolView(APIView):
    def post(self, request):
        symbol = request.data.get("symbol")
        print(symbol)
        # curreny to indian rupee
        # get today's date and convert to string in yyyy-mm-dd format
        date = datetime.datetime.today().strftime('%Y-%m-%d')

        df = yf.download(symbol, start="2014-01-01", end=date)
        df = pd.DataFrame(df)
        df = df.reset_index()
        df.to_csv('data.csv')
        print(df.tail(5))
        dictionaryK = calcK('data.csv')
        dictionaryL = calulate('data.csv')
        # take average of both the predictions
        dictionary = {
            "Next_Day_Close": (dictionaryK["Next_Day_Close"] + dictionaryL["Next_Day_Close"])/2,
            "Next_Day_Open": (dictionaryK["Next_Day_Open"] + dictionaryL["Next_Day_Open"])/2,
            "Next_Day_High": (dictionaryK["Next_Day_High"] + dictionaryL["Next_Day_High"])/2,
            "Next_Day_Low": (dictionaryK["Next_Day_Low"] + dictionaryL["Next_Day_Low"])/2
        }
        print(dictionary)

        return Response({"message": "Got some data!", "data": dictionary})
    
class NewsView(APIView):
    def post(self, request):
        symbol = request.data.get("symbol")
        print(symbol)
        titles, links,dates,desc = getNews(symbol)
        print(Sentiment(desc))

        return Response({"message": "Got some data!", "data": {symbol}})
    
class FifteenView(APIView):
    def post(self, request):
        symbol = request.data.get("symbol")
        print(symbol)
        fifteenPredict(symbol)


        return Response({"message": "Got some data!", "data": {symbol}})

        
