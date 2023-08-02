from database import mysql_cli, cursor

class FrameworkDB:
    def get_list():
        query = f"""
        SELECT name, type from framework
        """

        cursor.execute(query)
        ret = cursor.fetchall()

        return ret


    def get_version(key: str) -> dict:
        '''
        Read collection's data with any key

        :param key: to get specific data that matches
        '''
        query = f"""
        SELECT version FROM framework_version 
        WHERE framework_id=(
            SELECT id from framework
            WHERE name="{key}"
        );
        """
        cursor.execute(query)
        ret = cursor.fetchall()

        framework_versions = [x["version"] for x in ret]

        return framework_versions