//data：数据,path:存放路径,fn:回调函数 
function upimg(data,path,fn){
	var fs=require("fs");
	//当目录不存在时，创建目录
	var stat = fs.existsSync(path);
	if(!stat){
		fs.mkdir(path,function(err){
		   if (err) {
			   return console.error(err);
		   }
		   console.log("目录创建成功。");
		});
	}
	
	//解码base64文件
	if(data.indexOf('data:image/png;base64,')>=0){
			data =data.replace('data:image/png;base64,','');//解码，png
			path= path + Date.now() +'.png';//设置服务器文件夹路径		
	}else if(data.indexOf('data:image/jpeg;base64,')>=0){					
			data =data.replace('data:image/jpeg;base64,','');//解码，png
			path= path + Date.now() +'.jpg';//设置服务器文件夹路径
	}else{
			fn(data);//不是图片直接返数据
			return;
	}
	
	//创建文件
	var imgdata= new Buffer(data,'base64');
	fs.writeFile(path,imgdata,function(err,data) {
	  if (err) {
		 console.log('err');
		 return console.error(err);
	  }
	  console.log('图片储存成功');
	  path=path.replace(/Uploads\//,'');//去掉默认上传图片文件目录
	  console.log(path);
	  fn(path); 
   });
	return upimg;
}
exports.upimg = upimg;

