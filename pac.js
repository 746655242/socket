var http=require('http');
var cheerio=require('cheerio');
var baseUrl='http://www.imooc.com/learn/';
var videoIds=[348,259,197,134,75];

function filterChapters(html){ 
	var $=cheerio.load(html);
	var chapters=$('.chapter');
	var title=$('.hd .l').text();
	var number=parseInt($($('.meta-value strong')[3]).text().trim(),10)
	
	var courseData={ 
		videos:[],
		number:number,
		title:title 
	}
	
	courseData.title=title;
	courseData.number=number;
	
	chapters.each(function(item){ 
	
		var chapter=$(this);
		var chapterTitle=chapter.find('strong').text();
		var videos=chapter.find('.video').children('li');
		var chapterData={ chapterTitle:chapterTitle, videos:[] };
		
		videos.each(function(item){ 
			
			var video=$(this).find('.studyvideo');
			var videoTitle=video.text();
			console.log('1');
			if(video.attr('href')){
				var videoid=video.attr('href').split('video/')[1];
			}else{
				var videoid='1';
			}
			//var videoid='bb';
			chapterData.videos.push({ 
				title:videoTitle,id:videoid }); 
		 });
		 ;
		 courseData.videos.push(chapterData);
	});
	
	return courseData
}

function printCourseInfo (coursesData) { 
	console.log('printCourseInfo');
	coursesData.forEach(function(courseData){ 
		console.log(courseData.number+' 人学过 '+courseData.title+'\n')
		
	});
	coursesData.forEach(function(courseData){ 
		console.log('### '+courseData.title+'\n');
		courseData.videos.forEach(function(item){ 
			var chapterTitle=item.chapterTitle;
			console.log(chapterTitle+'\n');
			
			item.videos.forEach(function(video){ 
				console.log(' ['+video.id+'] '+video.title+'\n');
			}) 
		}) 
	})
}



function getPageAsync(url){ 
	return new Promise(function(resolve,reject){ 
		console.log('正在爬取 '+url);
		http.get(url,function(res){
			 var html='' 
			 res.on('data',function(data){ 
			 	html += data;
			 }) 
			 res.on('end',function(){
				  console.log('爬取 '+ url+' 成功');
				  resolve(html); 
			 })
		}).on('error',function(e){
			 reject(e);
			 console.log('获取课程数据出错');
		}) 
	}) 
}

//存放所有课程的html的一个数组 
var fentchCourseArray=[];

videoIds.forEach(function(id){ 
	fentchCourseArray.push(getPageAsync(baseUrl+id))
})


Promise
	.all(fentchCourseArray)
	.then(function(pages){ 
		var coursesData=[];
		pages.forEach(function(html){ 
			console.log("1111");
			console.log("1111");
			var courses=filterChapters(html);
			console.log(courses);
			coursesData.push(courses);
			
		})
		
		console.log("1111");
		coursesData.sort(function(a,b){
	    	return a.number
		})
		
		printCourseInfo(coursesData);
}); 
