import hashlib


def encrypt_string(hash_string):
    sha_signature = \
        hashlib.sha256(hash_string.encode()).hexdigest()
    return sha_signature


with open("hello.txt") as f:
    with open("new.txt", "w") as f1:
        for line in f:
            hash_string = ""
            hash_string = line
            sha_signature = encrypt_string(hash_string)
            f1.write(sha_signature)
