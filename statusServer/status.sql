DROP TABLE IF EXISTS status;
CREATE TABLE msgs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    msg TEXT NOT NULL,
    created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);
INSERT INTO msgs(msg) VALUES('サーバーがダウンしました'); -- 異常時のメッセージ
INSERT INTO msgs(msg) VALUES('サーバーが復帰しました'); -- 異常時のメッセージ