from database import cursor

class ContainerDB:
    # def push(key: dict = {}) -> dict:
    #     return collection.insert_one(key)


    def read(key: str) -> dict:
        '''
        Read collection's data with any key

        :param db: database name
        :param collection: collection name
        :param key: to get specific data that matches
        '''
        
        # query = "SELECT * FROM container where "

        # return list(collection.find(key, {'_id': False}))