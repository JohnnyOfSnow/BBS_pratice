var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser')
var modelCreate = require ('./model/postnewdb.js');
var modelQuery = require ('./model/postquerydb.js');
var modelRemove = require ('./model/postdeletedb.js');
var modelUpdate = require ('./model/todoupdatedb.js');

var app = express();

// 虛擬路徑 讓網址列知道要在public資料夾尋找靜態檔案，如：CSS、Javascripts
app.use("/public", express.static(__dirname + '/public'));

// 使用 session，要設定一個 secret key
app.use(session({
  secret: 'keyboard cat',
}))

// 有了這個才能透過 req.body 取東西
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

// 首頁，直接輸出所有留言
app.get('/', function (req, res) {

  // 試著看看 session 裡面有沒有 username 可以拿
  // 判斷是否是管理員
  var username = req.session.username;
  var isAdmin = false;
  if (username) {
    isAdmin = true;
  }

  // 拿出所有的留言
  modelQuery.QueryGet(function (err, posts) {
    if (err) {
      res.send(err);
    } else {

      // 記得要把 posts 反過來，才是正確的順序
      // 把所有東西丟給 ejs 去處理
      res.render('index1', {
        username: username,
        isAdmin: isAdmin,
        posts: posts.reverse()
      });
    }
  })
});

// 刪除文章

app.get('/posts/delete/:id', function (req, res) {
  var id = req.params.id;
  console.log("------id is : " + id);
  modelRemove.RemoveSave(id, function (err) {
    if (err) {
      res.send(err);
    } else {

      // 成功後導回首頁
      res.redirect('/');
    }
  })
})


// 新增文章
//
app.post('/posts', function (req, res) {
  var dataSet = [{
    author: req.body.author,
    content: req.body.content,
    createTime: new Date()
  }];
  
  modelCreate.InsertNew(dataSet, function (err, data) {
    if(err) {
      res.send(err)
    } else {
      res.redirect('/');
    }
  })
})

// 輸出登入頁面
app.get('/login', function (req, res) {
  res.render('login');
})

// 登入，如果帳號密碼是 peter 123 就登入通過
app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username === 'peter' && password === '123') {
    console.log('login success');
    req.session.username = 'peter';
  }
  res.redirect('/');
})

// 登出，清除 session
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/')
})

// 確認先連接到資料庫
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
