import urllib.request as req
import json
from flask import Flask, request, send_file
from flask_restx import Resource, Api, fields
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
api = Api(app, version='1.0', title='Text Mining for Financial Forecasting',
          description='A Text Mining visualisation tool. Completed by Wenxuan Shi z5182291')
api.namespaces.pop(0)
ns = api.namespace('historical-data', description='Historical Numerical Data')


@app.after_request
def after_request(response):
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.set('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response


def import_arg():
    parser = api.parser()
    parser.add_argument('Ticker', required=False, type=str,
                        help='helper', location='args')
    parser.add_argument('Date', required=False, type=str,
                        help='helper', location='args')
    return parser


def import_arg_prediction():
    parser = api.parser()
    parser.add_argument('Ticker', required=False, type=str,
                        help='helper', location='args')
    parser.add_argument('Date', required=False, type=str,
                        help='helper', location='args')
    parser.add_argument('DaysAfter', required=False, type=int,
                        help='helper', location='args')
    return parser


def import_arg_news():
    parser = api.parser()
    parser.add_argument('Ticker', required=False, type=str,
                        help='helper', location='args')
    parser.add_argument('Date', required=False, type=str,
                        help='helper', location='args')
    return parser

# Return the closing price, given ticker and time


def closing_price(ticker, time):
    # print(ticker[1:])
    print(time)
    data = pd.read_csv("./stock_price/with_7day_ma/"+ticker[1:]+".csv")
    data = data[data.Date.isin([time])]
    data = data['Close']
    return data.iloc[0].item()


def prediction_func(ticker, time, days):
    print(time)
    data = pd.read_csv(
        "./stock_price/with_7day_ma_and7days_prediction/compare_previous_day_"+str(days)+"/"+ticker[1:]+".csv")
    data = data[data.Date.isin([time])]
    data = data['indicator']
    return data.iloc[0].item()


def news_func(ticker, time):
    data = pd.read_csv("./news_with_compound_value/"+ticker[1:]+".csv")
    try:
        data = data[data.publishedDate.isin([time])]
        data = data[['title', 'image', 'url']]
    except:
        data = "no"
    return data


@ns.route('/closing-price/')
@api.response(200, 'Success')
@api.response(404, "Ticker / Date not found")
class Import(Resource):
    @api.expect(import_arg())
    @api.doc(params={'Ticker': 'type ticker here (e.g. $TSLA)'})
    @api.doc(params={'Date': 'type date here (e.g. 2020-01-24)'})
    def get(self):
        parser = import_arg()
        ticker = parser.parse_args()['Ticker']
        date = parser.parse_args()['Date']
        cp = closing_price(ticker, date)
        # print(date)
        # print(ticker)
        return {"closing_price": cp}, 200


@ns.route('/prediction/')
@api.response(200, 'Success')
@api.response(404, "Ticker / Date not found")
class Import(Resource):
    @api.expect(import_arg_prediction())
    @api.doc(params={'Ticker': 'type ticker here (e.g. $TSLA)'})
    @api.doc(params={'Date': 'type date here (e.g. 2020-01-24)'})
    def get(self):
        parser = import_arg_prediction()
        ticker = parser.parse_args()['Ticker']
        date = parser.parse_args()['Date']
        days = parser.parse_args()['DaysAfter']
        prediction = prediction_func(ticker, date, days)
        # print(date)
        # print(ticker)
        return {"prediction": prediction}, 200


@ns.route('/news/')
@api.response(200, 'Success')
@api.response(404, "Ticker / Date not found")
class Import(Resource):
    @api.expect(import_arg_news())
    @api.doc(params={'Ticker': 'type ticker here (e.g. $TSLA)'})
    @api.doc(params={'Date': 'type date here (e.g. 2020-01-24)'})
    def get(self):
        parser = import_arg_news()
        ticker = parser.parse_args()['Ticker']
        date = parser.parse_args()['Date']
        news = news_func(ticker, date)
        try:
            news.reset_index()
        except:
            news = "no"
        # print(news['title'].iloc[0])
        # print(date)
        # print(ticker)
        if (len(news) <= 0):
            return {"0": "No news today"}, 404
        elif (len(news) == 1):
            return {"0": [news['title'].iloc[0], news['image'].iloc[0], news['url'].iloc[0]]}, 200
        elif (len(news) == 2):
            return {"0": [news['title'].iloc[0], news['image'].iloc[0], news['url'].iloc[0]],
                    "1": [news['title'].iloc[1], news['image'].iloc[1], news['url'].iloc[1]]}, 200
        elif (len(news) == 3):
            return {"0": [news['title'].iloc[0], news['image'].iloc[0], news['url'].iloc[0]],
                    "1": [news['title'].iloc[1], news['image'].iloc[1], news['url'].iloc[1]],
                    "2": [news['title'].iloc[2], news['image'].iloc[2], news['url'].iloc[2]]}, 200
        elif (len(news) == 4):
            return {"0": [news['title'].iloc[0], news['image'].iloc[0], news['url'].iloc[0]],
                    "1": [news['title'].iloc[1], news['image'].iloc[1], news['url'].iloc[1]],
                    "2": [news['title'].iloc[2], news['image'].iloc[2], news['url'].iloc[2]],
                    "3": [news['title'].iloc[3], news['image'].iloc[3], news['url'].iloc[3]]}, 200
        else:
            return {"0": [news['title'].iloc[0], news['image'].iloc[0], news['url'].iloc[0]],
                    "1": [news['title'].iloc[1], news['image'].iloc[1], news['url'].iloc[1]],
                    "2": [news['title'].iloc[2], news['image'].iloc[2], news['url'].iloc[2]],
                    "3": [news['title'].iloc[3], news['image'].iloc[3], news['url'].iloc[3]],
                    "4": [news['title'].iloc[4], news['image'].iloc[4], news['url'].iloc[4]]}, 200


if __name__ == '__main__':
    #test(CORSRequestHandler, HTTPServer)
    CORS(app, support_credentials=True)
    app.run(debug=True)
    CORS(app, support_credentials=True)
