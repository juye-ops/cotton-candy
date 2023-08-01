import pymysql

def connect_mysql():
    mysql_cli = pymysql.connect(
        user="root",
        passwd="password",
        host='database',
        db='cotton_db',
        charset='utf8'
    )


    cursor = mysql_cli.cursor(pymysql.cursors.DictCursor)
    return cursor

cursor = connect_mysql()

from .containers import *
from .operating_systems import *
from .frameworks import *
from .projects import *
from .members import *