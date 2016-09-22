//用户名字和头像上传
function chat(req,res,config){	
		//res.send('你好!');//返回文字
		//res.locals= {title: '我是中国人', cc: '中国的',layout:'common/common'};//传给页面参数,layout继承公共文件 
		//res.render('home');	//返回views文件下home.html文件
		res.sendFile(config.www+'/chat.html');//返回静态文件
		return chat;
}; 
exports.init = chat;