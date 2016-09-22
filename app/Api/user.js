//用户名字和头像上传
function user(req,res,config){ 
		var path=require('path');
		var name=req.body.name;
		var pic=req.body.pic;
		//把base64图片储存，并返回
		var src=require('../models/upimg');
		var imgpath='./Uploads/toupic/';
		src.upimg(pic,imgpath,function(data){
			console.log(data);
			response = {
				"name":name,
				"pic":data
			}
			res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'}); 
			res.end(JSON.stringify(response));//返回数据			
		});
		return user;
}; 
exports.init = user;