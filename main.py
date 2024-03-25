import subprocess

def checkServerStatus(address:str, port):
    if address == None or port == None:
        return "Please enter the server adress and port"
    else:
        response = subprocess.run(['nc', '-vz', str(address), str(port)], encoding='utf-8', stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return "succeeded" in response.stderr # 出力結果はstderrに出力されるっぽい

print(checkServerStatus("localhost", 3000))