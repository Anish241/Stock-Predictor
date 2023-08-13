import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
def Train(attr,filename):
    df = pd.read_csv(filename)
    X = df[["Time","Prev_Close", "Prev_Open", "Prev_High", "Prev_Low", "Prev_Volume", "Prev_CO_Diff", "Prev_HL_Diff"]]
    y = df[attr]
    model = LinearRegression()
    model.fit(X, y)
    last_row = df.tail(1)
    last_input =[[last_row["Time"].values[0]+1,last_row["Close"].values[0], last_row["Open"].values[0], last_row["High"].values[0], last_row["Low"].values[0], last_row["Volume"].values[0], (last_row["Close"].values[0]-last_row["Open"].values[0]), (last_row["High"].values[0]-last_row["Low"].values[0])]]
    last_input = np.array(last_input)
    last_input = last_input.reshape(1, -1)
    prediction = model.predict(last_input)
    return prediction[0]



def calulate(filename):
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
    Next_Day_Close = Train("Close",filename)
    Next_Day_Open = Train("Open",filename)
    Next_Day_High = Train("High",filename)
    Next_Day_Low = Train("Low",filename)

    dictionary ={
        "Next_Day_Close":Next_Day_Close,
        "Next_Day_Open":Next_Day_Open,
        "Next_Day_High":Next_Day_High,
        "Next_Day_Low":Next_Day_Low
    }
    return dictionary

    
    
    


    

    