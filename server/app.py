from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from pymongo import MongoClient
from flask_cors import CORS
from bson.objectid import ObjectId
import pandas as pd
import json
from openai import OpenAI
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
# API_KEY = os.getenv("OPENAI_API_KEY")
# openai_client = OpenAI(api_key=API_KEY)

# mongo = PyMongo(app)
client = MongoClient(os.getenv("MONGO_URI"))
db = client.test
print(db.list_collection_names())


# Allow CORS for the frontend
CORS(app, origins=["http://localhost:5173"])

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    risk = data.get('risk-appetite')
    confirm_password = data.get('confirmPassword')
    answers = {f'answer{i+1}': data.get(f'answer{i+1}') for i in range(11)}

    if not all([name, email, password, confirm_password]):
        return jsonify({"error": "Missing required parameters"}), 400

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    hashed_password = generate_password_hash(password)
    
    user = client.db.users.find_one({"email": email})
    if user:
        return jsonify({"error": "User already exists"}), 400

    client.db.users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password,
        "answers": answers,
        "risk_profile": risk
    })

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Missing required parameters"}), 400

    user = client.db.users.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not check_password_hash(user['password'], password):
        return jsonify({"error": "Incorrect password"}), 400

    # Create a session for the user
    session['user_id'] = str(user['_id'])
    session['user_name'] = user['name']
    session['user_email'] = user['email']

    return jsonify({
        "message": "Login successful",
        "user": {
            "user_id": session['user_id'],
            "user_name": session['user_name'],
            "user_email": session['user_email']
        }
    }), 200


@app.route('/create_basket', methods=['POST'])
def create_basket():
    if request.method == 'POST':
        email = request.json.get('email')
        basket_name = request.json.get('basket_name')

        if not email or not basket_name:
            return jsonify({'error': 'Email and basket name are required.'}), 400

        user = client.db.users.find_one({'email': email})

        if not user:
            return jsonify({'error': 'User not found.'}), 404

        baskets = user.get('baskets', [])

        for obj in baskets:
            if basket_name == obj['basket_name']:
                return jsonify({'error': 'A basket with the same name already exists. No two baskets can have the same name.'}), 400

        basket = {
            '_id': ObjectId(),
            'basket_name': basket_name,
            'investments': []
        }

        result = client.db.users.update_one(
            {'email': email},
            {'$push': {'baskets': basket}}
        )

        if result.modified_count > 0:
            basket['_id'] = str(basket['_id'])
            return jsonify({'success': True, 'message': 'Basket created successfully', 'basket': basket}), 201
        else:
            return jsonify({'error': 'Basket creation failed'}), 500
            

@app.route('/my-baskets', methods=['POST'])
def get_my_baskets():
    email = request.json['email']
    user = client.db.users.find_one({"email": email})

    if user:
        baskets = user.get('baskets', [])

        basket_names = []

        for obj in baskets:
            basket_names.append(obj['basket_name'])

        return jsonify({'baskets': basket_names})
    else:
        return jsonify({'error': 'User not found'}), 404



@app.route('/basket/<basketname>', methods=['POST'])
def add_investment(basketname):
    if request.method == 'POST':
        email = request.json.get('email')
        investment_name = request.json.get('investment_name')
        investment_category = request.json.get('investment_category')
        investment_code = request.json.get('investment_code')
        investment_cagr = request.json.get('investment_cagr')
        investment_amount = request.json.get('investment_amount')
        time_period = request.json.get('time_period')

        if not (investment_category and investment_cagr and investment_name and investment_code and investment_amount and time_period):
            return jsonify({'error': 'All fields are required'})

        # Find the user
        user = client.db.users.find_one({'email': email})

        if not user:
            return jsonify({'error': 'User not found'})

        # Find the basket
        basket = next((basket for basket in user['baskets'] if str(basket['basket_name']) == basketname), None)

        if basket:
            # Retrieve existing list of investments, default to empty list if not found
            existing_list_of_investment = basket.get('investments', [])

            # Append new investment to existing list
            new_investment = {
                '_id': ObjectId(),
                'investment_name': investment_name,
                'investment_category': investment_category,
                'investment_code': investment_code,
                'investment_amount': investment_amount,
                'investment_cagr': investment_cagr,
                'time_period': time_period
            }
            # existing_list_of_investment.append(new_investment)
            print(existing_list_of_investment)

            # Update the basket document with the new list of investments
            result = client.db.users.update_one(
                {'email': email, 'baskets.basket_name': basketname},
                {'$push': {'baskets.$.investments': new_investment}}
            )

            print("result=============",result)

            if result.modified_count > 0:
                return jsonify({
                    'investment_name': investment_name,
                    'investment_category': investment_category,
                    'investment_code': investment_code,
                    'investment_amount': investment_amount,
                    'time_period': time_period
                }), 200
            else:
                return jsonify({'error': 'Failed to update basket'})
        else:
            return jsonify({'error': 'Basket not found'})

@app.route('/<basketname>/get-investments', methods=['POST'])
def get_investment(basketname):
    if request.method == 'POST':
        email = request.json.get('email')

        # Find the user
        user = client.db.users.find_one({'email': email})

        if not user:
            return jsonify({'error': 'User not found'})

        # Find the basket
        basket = next((basket for basket in user['baskets'] if str(basket['basket_name']) == basketname), None)

        if basket:
            # Retrieve existing list of investments, default to empty list if not found
            existing_list_of_investment = basket.get('investments', [])


            for investment in existing_list_of_investment:
                del investment['_id']

            return jsonify(existing_list_of_investment)
        else:
            return jsonify({'error': 'Basket not found'})
        

# @app.route('/get_mf_dash', methods=['GET'])
# def get_mf_dash():
#     if request.method=='GET':
#         collection_mutual_funds = client.db.mutual_funds.find()
#         mfs = list(collection_mutual_funds)
        
#         # Convert ObjectId to string for JSON serialization
#         for mf in mfs:
#             mf['_id'] = str(mf['_id'])
#             # del mf['_id']
        
#         return jsonify({'mfs':mfs})
    
@app.route('/get_mf_dash', methods=['GET'])
def get_mf_dash():
    def cagr_conversion(y):
        x = ((1 + y / 100) ** (1 / 3)) - 1
        return round(100 * x, 2)

    if request.method == 'GET':
        collection_mutual_funds = client.db.mutual_funds.find()
        mfs = list(collection_mutual_funds)
        mfs = pd.DataFrame(mfs)

        mfs['CAGR3Y'] = mfs['CAGR3Y'].apply(cagr_conversion)
        mfs.rename(columns={mfs.columns[5]: 'CAGR'}, inplace=True)

        mfs_final_list = mfs.to_dict(orient='records')
        # Convert ObjectId to string for JSON serialization
        for mf in mfs_final_list:
            mf['_id'] = str(mf['_id'])
        
        return jsonify({'mfs': mfs_final_list})
    
    
@app.route('/get_gold_bonds_dash', methods=['GET'])
def get_gold_bonds_dash():
    if request.method=='GET':

        collection_gold_bonds = client.db.gold_bonds.find()
        gold_bonds = list(collection_gold_bonds)
        gold_bonds = pd.DataFrame(gold_bonds)
        gold_bonds.drop(columns=['OPEN', 'HIGH', 'LOW', 'PREV. CLOSE', 'CHNG', '%CHNG', '52W H', '52W L', '30D %CHNG', '365 D', '30 D', 'Unnamed: 0'], inplace=True)

        gold_bonds_list=gold_bonds

        gold_bonds_final_list = gold_bonds_list.to_dict(orient='records')

        for gb in gold_bonds_final_list:
            gb['_id'] = str(gb['_id'])

        return jsonify({'gbs': gold_bonds_final_list})

        
@app.route('/get_etf_dash', methods=['GET'])
def get_etf_dash():
    if request.method=='GET':

        etfs = client.db.etfs.find()
        etfs = list(etfs)
        etfs = pd.DataFrame(etfs)
        etfs.drop(columns=['OPEN', 'HIGH', 'LOW', 'PREV. CLOSE', 'CHNG', '%CHNG', '52W H', '52W L', '30D  %CHNG', '365 D', '30 D'], inplace=True)

        etfs_list=etfs

        etfs_list.drop(columns=['Risk_Profile'], inplace=True)
        etfs_final_list = etfs_list.to_dict(orient='records')

        for etf in etfs_final_list:
            etf['_id'] = str(etf['_id'])

        return jsonify({'etfs':etfs_final_list})
    

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    if request.method=='POST':
        email = request.json['email']
        user_profile = client.db.users.find_one({'email':email})
        #mutual funds
        mfs = client.db.mutual_funds.find()
        mfs = list(mfs)
        mfs = pd.DataFrame(mfs)
        mfs.drop(columns=['_id'], inplace=True)
        risk_profile = user_profile['risk_profile']
        mfs_list=mfs
        if risk_profile=='Agressive':
            mfs_list = mfs[mfs['Risk_Profile']=='Agressive']
        elif risk_profile=='Moderate':
            mfs_list = mfs[mfs['Risk_Profile']=='Moderate']
        elif risk_profile=='Conservative':
            mfs_list = mfs[mfs['Risk_Profile']=='Conservative']
        mfs_list.drop(columns=['Risk_Profile'], inplace=True)
        mfs_final_list = mfs_list.to_dict(orient='records')
        #ETFs
        etfs =client.db.etfs.find()
        
        etfs = list(etfs)
        etfs = pd.DataFrame(etfs)
        print(etfs)
        etfs.drop(columns=['_id', 'OPEN', 'HIGH', 'LOW', 'PREV. CLOSE', 'CHNG', '%CHNG', '52W H', '52W L', '365 D', '30 D', '30D  %CHNG'], inplace=True)
        # user_profile = collection_users.find_one({'email':email})
        risk_profile = user_profile['risk_profile']
        etfs_list=etfs
        if risk_profile=='Agressive':
            etfs_list = etfs[etfs['Risk_Profile']=='Agressive']
        elif risk_profile=='Moderate':
            etfs_list = etfs[etfs['Risk_Profile']=='Moderate']
        elif risk_profile=='Conservative':
            etfs_list = etfs[etfs['Risk_Profile']=='Conservative']
        etfs_list.drop(columns=['Risk_Profile'], inplace=True)
        etfs_final_list = etfs_list.to_dict(orient='records')
        #GoldBonds
        gold_bonds = client.db.gold_bonds.find()
        gold_bonds = list(gold_bonds)
        gold_bonds = pd.DataFrame(gold_bonds)
        print(gold_bonds)
        gold_bonds.drop(columns=['_id', 'OPEN', 'HIGH', 'LOW', 'PREV. CLOSE', 'CHNG', '%CHNG', '52W H', '52W L', '30D %CHNG','365 D', '30 D'], inplace=True)
        # user_profile = collection_users.find_one({'email':email})
        risk_profile = user_profile['risk_profile']
        gold_bonds_list=gold_bonds
        if risk_profile=='Agressive':
            gold_bonds_list = gold_bonds[gold_bonds['Risk_Profile']=='Agressive']
        elif risk_profile=='Moderate':
            gold_bonds_list = gold_bonds[gold_bonds['Risk_Profile']=='Moderate']
        elif risk_profile=='Conservative':
            gold_bonds_list = gold_bonds[gold_bonds['Risk_Profile']=='Conservative']
        gold_bonds_list.drop(columns=['Risk_Profile'], inplace=True)
        gold_bonds_final_list = gold_bonds_list.to_dict(orient='records')
        print(gold_bonds_list)
        
        return jsonify({'mfs': mfs_final_list, 'etfs':etfs_final_list, 'gold_bonds': gold_bonds_final_list}), 200
    
# @app.route('/chatbot', methods=['POST'])
# def ai_chatbot():
#     if request.method=='POST':
#         email= request.json['email'] 
#         chat_log= request.json['log']
#         question = request.json['question']
#         chat_log.append({'role':'user', 'content':question})
#         # document = None
#         # try:
#         #     document = collection_chat_log_ai.find_one({'email': email})
#         #     chat_log = document['chat']
#         # except:
#         #     document = collection_chat_log_ai.insert_one({'email': email, 'chat': []})
#         #     chat_log = document['chat']

        
#         # chat_log.append({"role":"user", "content": question})
#         print(chat_log)
#         response = openai_client.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages= chat_log
#         )
#         assistant_response = response.choices[0].message.content
#         print("Chatgpt: ", assistant_response)
#         chat_log.append({"role":"assistant","content": assistant_response})

#         # collection_chat_log_ai.update_one({'email':email}, {'$set':{'email': email, 'chat': chat_log}})
        
#         return jsonify({'response':assistant_response, 'chatLog':chat_log})


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    session.pop('user_email', None)
    return jsonify({"message": "Logout successful"}), 200



if __name__ == '__main__':
    app.run(debug=True)
