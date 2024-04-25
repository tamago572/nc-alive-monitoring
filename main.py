import subprocess
import requests

textPath = "./text.txt"

def readText():
    with open(textPath, "r") as f:
        return f.read()

def writeText(text):
    with open(textPath, "w") as f:
        f.write(text)


def checkServerStatus(address:str, port):
    if address == None or port == None:
        return "Please enter the server adress and port"
    else:
        response = subprocess.run(['nc', '-vz', str(address), str(port)], encoding='utf-8', stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return "succeeded" in response.stderr # 出力結果はstderrに出力されるっぽい


def send_line_notify(notification_message):
    line_notify_token = 'YOUR_LINE_NOTIFY_TOKEN'
    line_notify_api = 'https://notify-api.line.me/api/notify'
    headers = {'Authorization': f'Bearer {line_notify_token}'}
    data = {'message': f'{notification_message}'}
    requests.post(line_notify_api, headers = headers, data = data)

if checkServerStatus("localhost", 3001) == False:
    # 閉じていた場合
    if readText() == "open":
        send_line_notify("サーバーがダウンしました")
        writeText("close")
else:
    # 開いていた場合
    writeText("open")
