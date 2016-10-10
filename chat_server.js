var WebSocketServer = require('ws').Server;
var uuid = require('node-uuid');
var fs=require("fs");

var src=require('./app/models/upimg');//保存图片

var Chatnumber={};//聊天室数
//加载已经建立的聊天室文件
fs.readFile('chat.txt', function (err, data) {
   if (!err){
   		var be=JSON.parse(data.toString());
		for(var i in be){
			be[i]=JSON.parse(be[i]);
		}
   		Chatnumber=be;
   }
   chatsever();
});



function chatsever(){
	
wss = new WebSocketServer({ port: 8181});
var dataIndex =0;
wss.on('connection', function (ws) {
	dataIndex += 1;
    console.log('在线总用户：'+dataIndex);	
	
	ws.on('message', function (data){
		data=JSON.parse(data);
		var id=data['id'];//聊天室ID
		var uid=data['uid'];//用户id
		var state=data['state'];//请求数据类型，0创建聊天房间,1新用户加入，2收到消息，3请求在线人员,4请求聊天室房间列表信息,
		var user=data['user'];//用户信息
		var message=data['text'];//发送内容
	
		
		
		if(!uid){//uid不存时候，创建一个uid
			var client_uuid = uuid.v4();	
		}else{
			client_uuid=uid
		}
		
		ws.uid=client_uuid;	
		ws.id=id;
		
		switch(state){  
			case 0://0创建聊天房间
				var pic=data['pic'];//房间图片
				var title=data['title'];//标题 
				var miaoshu=data['miaoshu'];//描述
				var renshu=data['renshu'];//人数
				var pw=data['pw'];//设置密码
				
				
				var imgpath='./Uploads/chatpic/';
				src.upimg(pic,imgpath,function(data){
					var clients=[];//当前聊天室人数
					clients.push({'uid':client_uuid, "ws": ws,'user':user});			
					var obj={'id':id,'clients':clients,'pic':data,'title':title,'miaoshu':miaoshu,'renshu':renshu,'pw':pw};
					Chatnumber[id]=obj;
					var u={'state':0,'uid':client_uuid,'id':id}
					console.log('创建房间成功'+id);
					console.log(Chatnumber);
					ws.send(JSON.stringify(u));	//反馈uid	
				});
				
				
			break;
			
			case 1://1新用户加入
				if(Chatnumber[id]){
					var clients=Chatnumber[id]['clients'];
					var b=false;
					var index;
					for(var i in clients){
						if(clients[i]['uid']==client_uuid){
							b=true;
							index=i;
							break;
						}
					}
					if(!b){//有房间时，检查一下该用户存不在
						clients.push({'uid':client_uuid, "ws": ws,'user':user});
					}else{//用户存在，重新存值
						clients[index]['ws']=ws;
						console.log('存在');
					}
					var u={'state':1,'uid':client_uuid,'title':Chatnumber[id]['title'],'miaoshu':Chatnumber[id]['miaoshu']}
					ws.send(JSON.stringify(u));
					return false;
					
				}else{
					var u={'state':404,'msg':'当前房间不存在'};
					ws.send(JSON.stringify(u));
					return false;
				}
			break;

			case 2://2收到消息
				if(message){
					var obj=Chatnumber[id];
					var pic=message['pic'];
					var newpath=[];
					if(pic.length>0){//聊天图片生成
						var imgpath='./Uploads/chatimg/';//聊天发送图片
						for(var i in pic){
							src.upimg(pic[i]['src'],imgpath,function(data){
								message['pic'][i]['src']=data;
								newpath.push(data);
							});
						}
					}
					var t=setTimeout(function(){
						if(pic.length==newpath.length){
							wsSend(obj,message,client_uuid,user);	
							clearInterval(t);
						}						
					},100);	
					
							
					

					
					//收到消息就发送
					
				}
			break;
			
			case 3://3请求在线人员
				var clients=Chatnumber[id]['clients'];
				var attr=[];
				for(var i in clients){
					attr.push(clients[i]['user']);
				}
				var u={'state':3,'clients':attr}
				ws.send(JSON.stringify(u));	//
				return false;		
			break;

			case 4://4请求聊天室房间列表信息,
				var attr=[];
				for(var i in Chatnumber){
					var chatber=new Object();
					chatber['id']=Chatnumber[i]['id'];
					chatber['pic']=Chatnumber[i]['pic'];
					chatber['title']=Chatnumber[i]['title'];
					chatber['miaoshu']=Chatnumber[i]['miaoshu'];
					chatber['renshu']=Chatnumber[i]['renshu'];
					chatber['ge']=Chatnumber[i]['clients'].length;
					attr.push(chatber);
				}
				
				var u={'state':4,'attr':attr}
				ws.send(JSON.stringify(u));	//
				return false;		
			break;

		}
		console.log('房间号'+id);
    });
	

	
	ws.on('close',function(data){
	
		dataIndex -= 1; 
		//删除数组
		var id=ws.id;
		if(!Chatnumber[id]){return false;}//房间不存时，不删除对象
		var uid=ws.uid;		
		var clients=Chatnumber[id]['clients'];
		for(var i in clients){
				if(clients[i]['uid']==uid){
					clients.splice(i,1);
					break;
				}
		}
		
		console.log('在线总用户：'+dataIndex);
	});
	
});

}



function wsSend(data,message,uid,user){//发送想关房间发送
	for(var i=0;i<data.clients.length;i++){
		var clientSocket = data.clients[i].ws;
		if(clientSocket.readyState=== 1){
			clientSocket.send(JSON.stringify({
				'state':2,
				'obj':message,
				'uid':uid,
				'user':user
			}));
		}
	}
	
}



process.on('exit', function(){
		 console.log('关闭'); //文件被保
});


process.on('SIGINT', function () {
	var objcc={};
	for(var i in Chatnumber){
		var obja={};
		obja['id']=Chatnumber[i]['id'];
		obja['pic']=Chatnumber[i]['pic'];
		obja['title']=Chatnumber[i]['title'];
		obja['miaoshu']=Chatnumber[i]['miaoshu'];
		obja['renshu']=Chatnumber[i]['renshu'];
		obja['pw']=Chatnumber[i]['pw'];
		obja['clients']=[];
		obja=JSON.stringify(obja);
		objcc[i]=obja;
	}
	
	var c=JSON.stringify(objcc);
	fs.writeFile('chat.txt',c, function (err) {
 		 if (err) throw err;
  		 console.log('保存成功'); //文件被保存	
		 process.exit(0);
	});	
});