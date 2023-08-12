from mysql.connector import pooling

mysql_cli = pooling.MySQLConnectionPool(
    pool_name="aiomysql",
    pool_size = 3,
    pool_reset_session=True,
    host="database",
    port="3306",
    database="cotton_db",
    user="root",
    password="password",
)

# cursor = mysql_cli.cursor(dictionary=True)

from .containers import *
from .operating_systems import *
from .frameworks import *
from .projects import *
from .members import *
