import subprocess

def checkServerStatus(address:str, port):
    if address == None or port == None:
        return "Please enter the server adress and port"
    else:
        response = subprocess.run(['nc', '-v', '-w', '1', str(address), str(port)], encoding='utf-8', stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return "succeeded" in response.stderr # 出力結果はstderrに出力されるっぽい

print(checkServerStatus("192.168.10.127", 25565))