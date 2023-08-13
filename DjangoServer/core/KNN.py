import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
def TrainK(attr,filename):
    df = pd.read_csv(filename)
    df = df.dropna()
    X = df[["Time","Prev_Close", "Prev_Open", "Prev_High", "Prev_Low" ,"Prev_CO_Diff", "Prev_HL_Diff"]]
    y = df[attr]
    model = KNeighborsRegressor(n_neighbors=6)
    model.fit(X, y)
    last_row = df.tail(1)
    last_input =[[last_row["Time"].values[0]+1,last_row["Close"].values[0], last_row["Open"].values[0], last_row["High"].values[0], last_row["Low"].values[0], (last_row["Close"].values[0]-last_row["Open"].values[0]), (last_row["High"].values[0]-last_row["Low"].values[0])]]
    last_input = np.array(last_input)
    last_input = last_input.reshape(1, -1)
    prediction = model.predict(last_input)
    return prediction[0]

def calcK(filename):
    df = pd.read_csv(filename)
    df["Prev_Close"] = df["Close"].shift(1)
    df["Prev_Open"] = df["Open"].shift(1)
    df["Prev_High"] = df["High"].shift(1)
    df["Prev_Low"] = df["Low"].shift(1)
    df["Prev_Volume"] = df["Volume"].shift(1)
    df = df.dropna()
    df["Prev_CO_Diff"] = df["Prev_Close"] - df["Prev_Open"]
    df["Prev_HL_Diff"] = df["Prev_High"] - df["Prev_Low"]
    # add a Time column 1,2,3, so on
    df["Time"] = [i for i in range(1,len(df)+1)]
    df.to_csv(filename)
    Next_Day_Close = TrainK("Close",filename)
    Next_Day_Open = TrainK("Open",filename)
    Next_Day_High = TrainK("High",filename)
    Next_Day_Low = TrainK("Low",filename)

    dictionary ={
        "Next_Day_Close":Next_Day_Close,
        "Next_Day_Open":Next_Day_Open,
        "Next_Day_High":Next_Day_High,
        "Next_Day_Low":Next_Day_Low
    }
    return dictionary

def train(df):
    X = df.drop(['Open','High','Low','Close','Volume','Adj Close'], axis=1)
    y_close = df['Close']
    y_open = df['Open']
    y_high = df['High']
    y_low = df['Low']

    X_train, X_test, y_train_close, y_test_close = train_test_split(X, y_close, test_size=0.2, random_state=42)
    X_train, X_test, y_train_open, y_test_open = train_test_split(X, y_open, test_size=0.2, random_state=42)
    X_train, X_test, y_train_high, y_test_high = train_test_split(X, y_high, test_size=0.2, random_state=42)
    X_train, X_test, y_train_low, y_test_low = train_test_split(X, y_low, test_size=0.2, random_state=42)

    # KNN
    knn_close = KNeighborsRegressor(n_neighbors=6)
    knn_close.fit(X_train, y_train_close)
    knn_open = KNeighborsRegressor(n_neighbors=6)
    knn_open.fit(X_train, y_train_open)
    knn_high = KNeighborsRegressor(n_neighbors=6)
    knn_high.fit(X_train, y_train_high)
    knn_low = KNeighborsRegressor(n_neighbors=6)
    knn_low.fit(X_train, y_train_low)

    return knn_close, knn_open, knn_high, knn_low

def getLast(df):
    openn = df['Open'].iloc[-1]
    close = df['Close'].iloc[-1]
    high = df['High'].iloc[-1]
    low = df['Low'].iloc[-1]
    co_diff = close - openn
    hl_diff = high - low
    time = df['Time'].iloc[-1]
    x = [[close,high,low,openn,co_diff,hl_diff,time]]
    return x

def appendLast(openn,close,high,low,df):
    prev_open = df['Open'].iloc[-1]
    prev_close = df['Close'].iloc[-1]
    prev_high = df['High'].iloc[-1]
    prev_low = df['Low'].iloc[-1]
    prev_co_diff = prev_close - prev_open
    prev_hl_diff = prev_high - prev_low
    new_row = {'Open':openn,'Close':close,'High':high,'Low':low,'Prev_Open':prev_open,'Prev_Close':prev_close,'Prev_High':prev_high,'Prev_Low':prev_low,'Prev_CO_Diff':prev_co_diff,'Prev_HL_Diff':prev_hl_diff,'Time':df['Time'].iloc[-1]+1}
    df = df.append(new_row,ignore_index=True)
    return df

def predictNextFifteen(df):
    for i in range(15):
        knn_close, knn_open, knn_high, knn_low = train(df)
        x = getLast(df)
        close = knn_close.predict(x)[0]
        openn = knn_open.predict(x)[0]
        high = knn_high.predict(x)[0]
        low = knn_low.predict(x)[0]
        df = appendLast(openn,close,high,low,df)
    return df





def calcK2(filename):
    df = pd.read_csv(filename)
    df["Date"] = pd.to_datetime(df["Date"])
    df.sort_values(by='Date', inplace=True)
    df["Prev_Close"] = df["Close"].shift(1)
    df["Prev_High"] = df["High"].shift(1)
    df["Prev_Low"] = df["Low"].shift(1)
    df["Prev_Open"] = df["Open"].shift(1)
    df.dropna(inplace=True)
    df["Prev_CO_Diff"] = df["Prev_Close"] - df["Prev_Open"]
    df["Prev_HL_Diff"] = df["Prev_High"] - df["Prev_Low"]
    df.drop(["Date"],axis=1,inplace=True)
    df["Time"] = df.index 
    df = predictNextFifteen(df)
    # plot last 15 dayys using matplotlib
    df = df.tail(15)
    df = df.reset_index()
    return df























