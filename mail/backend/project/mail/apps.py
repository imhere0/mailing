from django.apps import AppConfig
from django.conf import settings
import pickle

class MailConfig(AppConfig):
    name = 'mail'


class ClassifierConfig(AppConfig):
   with open('filename.pickle', 'rb') as handle:
      unserialized_data = pickle.load(handle)
   classifier = unserialized_data['classifier']
   vectorizer = unserialized_data['vectorizer']