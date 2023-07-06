from pymongo import MongoClient

def connect_mongo():
    mongo_cli = MongoClient("mongodb://database:27017/")

    db = mongo_cli.cotton
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

    return db

cotton_db = connect_mongo()

from .containers import *
from .operating_systems import *
from .platforms import *
from .projects import *
from .users import *