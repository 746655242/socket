function route(app,urlencodedParser){
 //  主页输出 "Hello World"
	
	var path=require('path');
	
	app.get('/', function (req, res) {
		 res.send('你好!');
		// res.sendFile( __dirname + "/" +'html/home/index.html');

 	})
	app.get('/list.html', function (req, res) {
		 res.sendFile(__dirname + "/" +'html/home/list_user.html');
 	})
	
	app.get('/chat', function (req, res) {
		//res.send('你好!');
		res.sendFile(path.normalize(__dirname +'/'+ "../chat.html"));
 	})

	app.get('/process_get',function(req,res){
			response = {
				first_name:req.query.first_name,
				last_name:req.query.last_name
			}
			console.log(response);
			 res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
			res.end(JSON.stringify(response));

		});


	app.post('/process_post',urlencodedParser,function(req,res){
		response = {
			first_name:req.body.first_name,
			last_name:req.body.last_name
		}
		console.log(response);
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
		res.end(JSON.stringify(response));

	});

	app.post('/api/user',urlencodedParser,function(req,res){
		
		console.log(req.query);
		//var user=require('./Api/user');
		//user.user(req,res);
		console.log('1');
	});
	
	return route;
}
exports.route = route;