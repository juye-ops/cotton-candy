from mysql.connector import pooling

mysql_cli = pooling.MySQLConnectionPool(
    pool_name="aiomysql",
    pool_size=3,
    pool_reset_session=True,
    host="database",
    port="3306",
    database="cotton_db",
    user="root",
    password="password",
)


def select(func):
    def _select(*args):
        query, arg = func(*args)

        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(query, arg)
        ret = cursor.fetchall()

        conn.close()

        return ret

    return _select


def insert(func):
    def _insert(*args):
        query, arg = func(*args)

        conn = mysql_cli.get_connection()
        cursor = conn.cursor()

        cursor.execute(query, arg)
        conn.commit()

        conn.close()

    return _insert


def update(func):
    def _update(*args):
        query, arg = func(*args)

        conn = mysql_cli.get_connection()
        cursor = conn.cursor()

        cursor.execute(query, arg)
        conn.commit()

        conn.close()

    return _update


def delete(func):
    def _delete(*args):
        query, arg = func(*args)

        conn = mysql_cli.get_connection()
        cursor = conn.cursor()

        cursor.execute(query, arg)
        conn.commit()

        conn.close()

    return _delete


from .containers import *
from .operating_systems import *
from .frameworks import *
from .projects import *
from .members import *
