from database import cotton_db

collection = cotton_db.container

class ContainerDB:
    def push(key: dict = {}) -> dict:    
        return collection.insert_one(key)


    def read(key: dict = {}) -> dict:
        '''
        Read collection's data with any key

        :param db: database name
        :param collection: collection name
        :param key: to get specific data that matches
        '''
        
        return list(collection.find(key, {'_id': False}))