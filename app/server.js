var express = require('express');
var app = express();
var router = require("./router");


var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('res'));//设置资源文件 

router.route(app,urlencodedParser);

var server = app.listen(80, function () {
  var host = server.address().address;
  console.log(server.address());
  var port = server.address().port;
  
  console.log("应用实例，访问地址为 http://%s:%s",host, port)

})