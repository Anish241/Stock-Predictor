import pandas as pd
import numpy as np
import math
import datetime as dt
from sklearn.metrics import mean_squared_error, mean_absolute_error, explained_variance_score, r2_score 
from sklearn.metrics import mean_poisson_deviance, mean_gamma_deviance, accuracy_score
from sklearn.preprocessing import MinMaxScaler
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import yfinance as yf
import datetime
from .KNN import calcK2



def fifteenPredict(symbol):
        date = datetime.datetime.today().strftime('%Y-%m-%d')
        df = yf.download(symbol, start='2014-01-01', end=date)
        df = pd.DataFrame(df)
        df.to_csv("data.csv")
        df = calcK2("data.csv")
        df = pd.DataFrame(df)
        # plot df
        fig = make_subplots(rows=2, cols=2, subplot_titles=("Close", "Open", "High", "Low"))
        fig.add_trace(go.Scatter(x=df.index, y=df['Close'], name="Close"), row=1, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['Open'], name="Open"), row=1, col=2)
        fig.add_trace(go.Scatter(x=df.index, y=df['High'], name="High"), row=2, col=1)
        fig.add_trace(go.Scatter(x=df.index, y=df['Low'], name="Low"), row=2, col=2)
        fig.update_layout(height=600, width=800, title_text="Stock Price Data")
        fig.show()
        


        