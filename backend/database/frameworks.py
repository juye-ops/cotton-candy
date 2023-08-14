from database import mysql_cli


class FrameworkDB:
    def get_list():
        query = """
        SELECT name, type from framework
        """

        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(query)
        ret = cursor.fetchall()

        conn.close()

        return ret

    def get_version(key: str) -> dict:
        """
        Read collection's data with any key

        :param key: to get specific data that matches
        """
        query = """
        SELECT version FROM framework_version 
        WHERE framework_id=(
            SELECT id from framework
            WHERE name="{key}"
        );
        """

        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(query)
        ret = cursor.fetchall()

        framework_versions = [x["version"] for x in ret]

        conn.close()

        return framework_versions
