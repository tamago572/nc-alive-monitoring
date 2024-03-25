# nc-alive-monitoring

Pythonでnetcatを実行し、疎通確認をするためのプログラム。

```Python
# main.py
print(checkServerStatus("192.168.10.127", 25565)) # 対象のアドレス、対象のポートを指定 Bool値が返ってくる　
```

疎通確認出来た場合は`True`、それ以外は`False`が出力されます。

是非死活監視などにご利用ください。
