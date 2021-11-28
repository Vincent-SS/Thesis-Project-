import urllib.request as req
import json
from flask import Flask, request, send_file

#ALL_TICKERS = ["$TSLA", "$NVDA", "$INTC", "$PFE", "$SPGI", "$LRCX", "$TMUS", "$ADSK", "$VRTX", "$TWTR", "$EBAY", "$CARR", "$VRSN", "$GRMN", "$ANET", "$AAL"]
#ALL_TICKERS = ["$CARR"]
ALL_TICKERS = ["$TSLA", "$INTC", "$PFE", "$SPGI", "$ADSK",
               "$VRTX", "$TWTR", "$EBAY", "$GRMN", "$AAL", "$ANET"]


def crawl_news(resource_date, resource, ticker, index):
    full_resource = resource + resource_date
    news = req.Request(full_resource)
    data = json.loads(req.urlopen(news).read())
    with open('./financial_news_long_period/'+ticker+str(index), 'w') as outfile:
        json.dump(data, outfile)


# Fetch four years' news from FMP Cloud
for ticker in ALL_TICKERS:
    index = 1
    # print(ticker[1:])
    resource_1 = "https://financialmodelingprep.com/api/v3/stock_news?tickers="
    resource_name = ticker[1:] + "&limit=4999&"
    resource = resource_1 + resource_name

    crawl_news("from=2020-10-01&to=2021-01-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2020-07-01&to=2020-10-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2020-04-01&to=2020-07-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2020-01-01&to=2020-04-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2019-10-01&to=2020-01-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2019-07-01&to=2019-10-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2019-04-01&to=2019-07-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2019-01-01&to=2019-04-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1

    crawl_news("from=2018-10-01&to=2019-01-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2018-07-01&to=2018-10-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2018-04-01&to=2018-07-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2018-01-01&to=2018-04-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2017-10-01&to=2018-01-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2017-07-01&to=2017-10-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2017-04-01&to=2017-07-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2017-01-01&to=2017-04-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1

    """
    crawl_news("from=2018-10-01&to=2019-01-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2018-07-01&to=2018-10-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2019-04-01&to=2019-07-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    index += 1
    crawl_news("from=2019-01-01&to=2019-04-01&apikey=36b1e1138b5439855ac06071eef17859",
               resource, ticker, index)
    """

    """
    OLD VERSION BELOW, KEEP FOR BACKUP
    """
    """ resource_date1 = "from=2020-10-01&to=2021-01-01&apikey=36b1e1138b5439855ac06071eef17859"
    full_resource = resource + resource_date1
    news = req.Request(full_resource)
    data = json.loads(req.urlopen(news).read())
    #f = open("./financial_news/"+ticker, "w")
    #f.write(str(data))
    with open('./financial_news/'+ticker+str(index), 'w') as outfile:
    json.dump(data, outfile)

    index+=1
    resource_date2 = "from=2020-07-01&to=2020-10-01&apikey=36b1e1138b5439855ac06071eef17859"
    full_resource = resource + resource_date2
    news = req.Request(full_resource)
    data = json.loads(req.urlopen(news).read())
    #f.write(str(data))
    with open('./financial_news/'+ticker+str(index), 'w') as outfile:
    json.dump(data, outfile)

    index+=1
    resource_date3 = "from=2020-04-01&to=2020-07-01&apikey=36b1e1138b5439855ac06071eef17859"
    full_resource = resource + resource_date3
    news = req.Request(full_resource)
    data = json.loads(req.urlopen(news).read())
    #f.write(str(data))
    with open('./financial_news/'+ticker+str(index), 'w') as outfile:
    json.dump(data, outfile)

    index+=1
    resource_date4 = "from=2020-01-01&to=2020-04-01&apikey=36b1e1138b5439855ac06071eef17859"
    full_resource = resource + resource_date4
    news = req.Request(full_resource)
    data = json.loads(req.urlopen(news).read())
    #f.write(str(data))
    with open('./financial_news/'+ticker+str(index), 'w') as outfile:
    json.dump(data, outfile)

    index+=1
    resource_date5 = "from=2019-10-01&to=2020-01-01&apikey=36b1e1138b5439855ac06071eef17859"
    full_resource = resource + resource_date5
    news = req.Request(full_resource)
    #f.write(str(data))
    with open('./financial_news/'+ticker+str(index), 'w') as outfile:
    json.dump(data, outfile)

    index+=1
    resource_date6 = "from=2019-07-01&to=2019-10-01&apikey=36b1e1138b5439855ac06071eef17859"
    full_resource = resource + resource_date6
    news = req.Request(full_resource)
    data = json.loads(req.urlopen(news).read())
    #f.write(str(data))
    with open('./financial_news/'+ticker+str(index), 'w') as outfile:
    json.dump(data, outfile)

    index+=1
    resource_date7 = "from=2019-04-01&to=2019-07-01&apikey=36b1e1138b5439855ac06071eef17859"
    full_resource = resource + resource_date7
    news = req.Request(full_resource)
    data = json.loads(req.urlopen(news).read())
    #f.write(str(data))
    with open('./financial_news/'+ticker+str(index), 'w') as outfile:
    json.dump(data, outfile)

    index+=1
    resource_date8 = "from=2019-01-01&to=2019-04-01&apikey=36b1e1138b5439855ac06071eef17859"
    full_resource = resource + resource_date8
    news = req.Request(full_resource)
    data = json.loads(req.urlopen(news).read())
    #print(type(data))
    #f.write(str(data))
    with open('./financial_news/'+ticker+str(index), 'w') as outfile:
    json.dump(data, outfile)
    """
