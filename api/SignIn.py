from flask import Flask, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
user_accounts = db.collection("user_account_table")
app = Flask(__name__)

#This is the back-end implementation for SignIn Page
def process_login(username, password):
    return "aye"