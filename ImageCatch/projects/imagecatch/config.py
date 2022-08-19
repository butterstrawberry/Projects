import os

BASE_DIR = os.path.dirname(__file__)
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{passwd}@{host}/{db}'.format(BASE_DIR,
user = 'hyun',
passwd = 'rkcjsdlalwlzocl',
host = '15.165.253.168',
db = 'imca_db',
)
SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = b'\xa8\xbc\x11)S_d\xd4\x8c\x8e\xddy`DGU'