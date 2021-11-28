# Thesis-Project
## Running Environment

### Backend:

In order to run the training step, the Python environment should be 3.7.6, with required packages installed: pandas, numpy, json, nltk.sentiment.vader, datetime, sklearn.model_selection, sklearn.preprocessing, sklearn.ensemble, sklearn.metrics, and sklearn.linear_model.

In order to run the backend server, url lib.request, flask_restx, and flask_cors are needed. If all packages are installed, the following command will run the backend server:

Python3 api_connect.py

http://127.0.0.1:5000/ (backend server’s swagger UI) will be able to open if the environment has been setup successfully.

#### Some important Python/notebook files:
news_api.py: Financial news fetching endpoint (From FMP Cloud service)
api_connect.py: Running backend server. The API Gateway for Frontend.
clean_data_predict_trend_with_7day_past_high_accuracy.ipynb: The data processing (pre-processing) and training file.

After running the training file, all the training results (prediction result and accuracy for each company) will be shown on the same path as the notebook, named $TICKER.outputRandomForest.csv or $TICKER.summaryRandomForest.csv. Please note that the system used Passive Aggressive Classifier model, not the RandomForest model in the files’ name.

### Frontend:

Node is required to run the frontend (https://nodejs.org/en/download/). After the installation of Node, navigate to the frontend’s folder in the terminal and run ‘npm install’ to install all the required packages (listed in package.json).

If the installation is successful, running ‘npm start’ will trigger the frontend, and http://localhost:3000 will be able to access.

#### Note:
In order to test all the functions in Frontend, Backend needs to be running at the same time.
