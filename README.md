# nc-alive-monitoring

PythonでNetcatとLINE Notifyを使って死活管理する

```Python
# main.py
print(checkServerStatus("192.168.10.127", 25565)) # 対象のアドレス、対象のポートを指定 Bool値が返ってくる　
```

疎通確認出来た場合は`True`、それ以外は`False`が出力されます。

subprocessを使用するので、netcatはインストールしておいてください。

## main.pyの使い方

```Python
if checkServerStatus("localhost", 3001) == False:
```

rootに`.env`ファイルを作成します
```env
LINE_NOTIFY_TOKEN={YOUR_TOKEN}
IP=192.168.10.127
PORT=11451
```
rootの方には上記すべて、/statusServerの方にはLINE_NOTIFY_TOKENを入力します。

nodejsを実行するには`node --env-file=../.env index.js`のように.envファイルのパスを引数として渡してください

### 機能

- サーバーダウン時にLINE Notifyに通知を送信
- サーバー復帰時にLINE Notifyに通知を送信
- テキストファイルに前回の疎通確認結果を保持するので、定期実行に向いています

是非死活監視などにご利用ください。
