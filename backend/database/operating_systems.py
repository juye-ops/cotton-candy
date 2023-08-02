from database import mysql_cli, cursor

class OSDB:
    def get_list():
        query = f"""
        SELECT name from os
        """

        cursor.execute(query)
        ret = cursor.fetchall()

        os_list = [x["name"] for x in ret]

        return os_list


    def get_version(key: str) -> dict:
        '''
        Read collection's data with any key

        :param key: to get specific data that matches
        '''
        query = f"""
        SELECT version FROM os_version 
        WHERE os_id=(
            SELECT id from os
            WHERE name="{key}"
        );
        """
        
        cursor.execute(query)
        ret = cursor.fetchall()

        os_versions = [x["version"] for x in ret]
        
        return os_versions