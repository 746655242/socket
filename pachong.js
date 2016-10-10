var http=require('http');
var cheerio=require('cheerio');
var baseUrl='http://www.panda.tv/cate/';
var videoIds=['lol','overwatch'];


function getpate(url){
	return new Promise(function(resolve,reject){
			console.log('正在爬行：'+url)
		http.get(url,function(res){
			var html='';
			res.on('data',function(data){
				html +=data;
			});
			res.on('end',function(){
				resolve(html);
				console.log('爬行完成：'+url);
			});
			
		}).on('error',function(e){
			reject(e);
			console.log('出错');
		});
	
	
	})
}

var urlattr=[];
videoIds.forEach(function(id){
	urlattr.push(getpate(baseUrl+id));
});

function jiexie(html){
	var $=cheerio.load(html);
	var title=$('title').text();
	console.log(title);
	return title;
}

Promise
	.all(urlattr)
	.then(function(data){
		var coursesData=[];
		data.forEach(function(html){
			var bbb=jiexie(html);
			coursesData.push(bbb);
			
		});
		console.log(coursesData);
		
	});