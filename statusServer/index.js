const express = require('express')
const app = express()
const port = 3000

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("status.db");

const lineNotify = require('line-notify-nodejs')(process.env.LINE_NOTIFY_TOKEN);

const fs = require('fs');

app.set('view engine', 'ejs');
// リクエストボディを解析するためのミドルウェアを追加
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    try {
        var status = fs.readFileSync("../text.txt", "utf-8");
    } catch (err) {
        console.log(err);
        res.send(err);
    }
    db.all("select * from msgs", (err, rows) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            console.log(rows);
            const msgs = rows.map((row) => row.msg);

            const data = {
                title: "LINE Notifyの設定/bunbun鯖",
                maint_msg: msgs,
                status: status,
            }
            res.render('index.ejs', data)
        }
    });

})

app.get('/downmsg', (req, res) => {
    //res.send('Status Server is running!')
    db.each("select * from msgs where id=1", (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(row.created_at);
            res.send(row.msg);
        }
    });
})
app.get('/upmsg', (req, res) => {
    //res.send('Status Server is running!')
    db.each("select * from msgs where id=2", (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(row.created_at);
            res.send(row.msg);
        }
    });
})

app.post('/maint_down_update', (req, res) => {
    const dwnmsg = req.body.dwnmsg;
    console.log(dwnmsg);

    const stmt = db.prepare("update msgs set msg = ? where id = 1");
    stmt.run(dwnmsg, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("update success");
            res.redirect('/');
        }
    })

})

app.post('/maint_up_update', (req, res) => {
    const upmsg = req.body.upmsg;
    console.log(upmsg);

    const stmt = db.prepare("update msgs set msg = ? where id = 2");
    stmt.run(upmsg, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("update success");
            res.redirect('/');
        }
    })

})

app.post('/notify', (req, res) => {
    const msg = req.body.msg;
    console.log(msg);

    lineNotify.notify({
        message: msg
    }).then(() => {
        console.log('send success');
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
        res.send(err);
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})