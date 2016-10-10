var express = require('express');
var app = express();
var bodyParser = require('body-parser');//上传中间件
var fs=require("fs");
var hbs= require('hbs');//模板配置
var router = require("./router"); //路由

var cookieParser = require('cookie-parser');
var session = require('express-session');



app.use(session({
    secret: '12345',  
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid  
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期  
    resave: false,  
    saveUninitialized: true,  
}));




//全局变量
var config={
	'www':__dirname,
}

//registerPartials设置,文件为公用文件 ，registerPartial指定继承
hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/common/common.html', 'utf8'));
hbs.registerPartials(__dirname + '/views/common/');	


//设置hbs模板后缀
//设置views的地址
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('html', hbs.__express);


//模板设置
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
	
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this)); 
	console.log(block);
});

hbs.registerHelper('block', function(name, context) {
	var len = (blocks[name] || []).length;
    var val = (blocks[name] || []).join('\n');

    blocks[name] = [];

    if(!len){
    	return context.fn(this);
    }else{
    	return val;
    }
});



// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false,limit:'100000kb' });


//设置资源文件
app.use(express.static('res'));
app.use(express.static('Uploads'));

//加载路由文件
router.route(app,urlencodedParser,config);


//启动服务器
var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
