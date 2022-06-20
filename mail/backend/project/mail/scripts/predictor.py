import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

def give_prediction():
    raw_mail_data = pd.read_csv('mail/scripts/spam_or_not_spam.csv')
    mail_data= raw_mail_data.where((pd.notnull(raw_mail_data)), '')
    X = mail_data['email']
    Y = mail_data['label']
    X_train, X_test, Y_train, Y_test = train_test_split(X,Y, test_size = 0.2, random_state = 42)
    feature_extraction = TfidfVectorizer(min_df = 1, stop_words = 'english')
    X_train_features = feature_extraction.fit_transform(X_train)
    model = LogisticRegression()
    model.fit(X_train_features, Y_train)
    
    db = {
    'vectorizer': feature_extraction,
    'classifier': model
    }
    with open('filename.pickle', 'wb') as handle:
        pickle.dump(db, handle, protocol=pickle.HIGHEST_PROTOCOL)