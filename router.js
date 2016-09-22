function route(app,urlencodedParser,config){

 //  主页输出 "Hello World"
	/*var luyou=[

			{	
				url:'/chat',
				type:'get',
				path:'./app/mian/chat',
			},
						{	
				url:'/api/user',
				type:'get',
				path:'./app/Api/user',
			},
		]
	
	//数据绑定
	for(var i in luyou){
		var url=luyou[i]['url'],type=luyou[i]['type'],path=luyou[i]['path'];
		console.log(i);
		if(type=='get'){
			app.get(url,urlencodedParser,function(req,res){
				var jsobj=require(path);
				jsobj.init(req,res,config);	
			});
		}else if(type=='post'){
			app.post(url,urlencodedParser,function(req,res){
				var jsobj=require(path);
				jsobj.init(req,res,config);	
			});
		}
	}
	

	
	var path=require('path');

	var fs=require("fs");
	
	app.get('/', function (req, res) {
		 res.send('你好!');
		// res.sendFile( __dirname + "/" +'html/home/index.html');

 	})*/
	
	app.get('/', function (req,res) {	
		var jsobj=require('./app/mian/chat');
		jsobj.init(req,res,config);	
 	})
	
	app.post('/api/user',urlencodedParser,function(req,res){
		var jsobj=require('./app/Api/user');
		jsobj.init(req,res,config);	
		
	});
	
	app.get('*', function(req, res){
		res.send('没有当前页面');
	});
		
	return route;
}
exports.route = route;