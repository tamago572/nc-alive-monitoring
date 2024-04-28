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

`localhost`には対象のIPアドレス、`3001`には対象のポートを入力してください。

```Python
    line_notify_token = 'YOUR_LINE_NOTIFY_TOKEN'
```

ここにはLINE NotifyのTokenを入力してください。

また、同じディレクトリにtext.txtを作成してください。

さらに、そのテキストファイルに、現時点でのサーバーの状態を書き込んで保存してください。

開いている状態なら`open`、閉じている状態なら`close`と入力してください。

### 機能

- サーバーダウン時にLINE Notifyに通知を送信
- サーバー復帰時にLINE Notifyに通知を送信
- テキストファイルに前回の疎通確認結果を保持するので、定期実行に向いています

是非死活監視などにご利用ください。
