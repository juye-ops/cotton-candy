from database import mysql_cli


class OSDB:
    def get_list():
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT name from os
        """

        cursor.execute(query)
        ret = cursor.fetchall()

        os_list = [x["name"] for x in ret]

        conn.close()

        return os_list

    def get_version(key: str) -> dict:
        """
        Read collection's data with any key

        :param key: to get specific data that matches
        """
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT version FROM os_version 
        WHERE os_id=(
            SELECT id from os
            WHERE name="{key}"
        );
        """

        cursor.execute(query)
        ret = cursor.fetchall()

        os_versions = [x["version"] for x in ret]
        
        conn.close()
        
        return os_versions
