from pymongo import MongoClient
from bson.json_util import dumps

db_cli = MongoClient("mongodb://database:27017/")
def preprocess():
    '''
    Initialize database when run server
    '''
    db = db_cli.images
    os = [
        {
            "_id": 0,
            "name": "ubuntu",
            "version": ["3.7", "3.8", "3.9", "3.10"]
        }
    ]

    platform = [
        {
            "_id": 0,
            "name": "python",
            "version": ["3.7", "3.8", "3.9", "3.10"]
        },
        {
            "_id": 1,
            "name": "node",
            "version": ["14", "16", "18", "20"]
        }
    ]

    db.platform.insert_many(platform)
    db.os.insert_many(os)


def read(db: str, collection: str, key: dict = {}) -> dict:
    '''
    Read collection's data with any key

    :param db: database name
    :param collection: collection name
    :param key: to get specific data that matches
    '''
    
    return list(db_cli[db][collection].find(key, {'_id': False}))