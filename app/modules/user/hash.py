import bcrypt

global salt
salt = bcrypt.gensalt()

def hash_password(x: str) -> str:
    return bcrypt.hashpw(x.encode('utf-8'), salt).decode('utf-8')