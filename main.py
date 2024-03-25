import subprocess
import sys

def checkServerStatus(address:str, port):
    if address == None or port == None:
        return "Please enter the server adress and port"
    else:
        print("実行↓")
        response = subprocess.run(['nc', '-v', '-w', '1', str(address), str(port)], encoding='utf-8', stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print("stdout↓")
        print(response.stdout)
        print("stderr↓")
        print(response.stderr)
        return "succeeded" in response.stderr

print(checkServerStatus("192.168.10.127", 11451))