import pymysql
from config import USER, HOST, PORT, DB, JWT_SECRET_KEY

db = pymysql.connect(
    user = USER,
    host = HOST,
    port = PORT,
    db = DB,
    charset = 'utf8',
    autocommit = True
)