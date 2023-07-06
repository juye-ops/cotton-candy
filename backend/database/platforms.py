from database import cotton_db

collection = cotton_db.platform

class PlatformDB:
    def read(key: dict = {}) -> dict:
        '''
        Read collection's data with any key

        :param key: to get specific data that matches
        '''
        return list(collection.find(key, {'_id': False}))