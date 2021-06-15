import pymysql
from config import USER, HOST, PORT, DB, PASSWORD

db = pymysql.connect(
    user = USER,
    host = HOST,
    port = PORT,
    db = DB,
    password = PASSWORD,
    charset = 'utf8',
    autocommit = True
)