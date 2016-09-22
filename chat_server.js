var WebSocketServer = require('ws').Server;
var uuid = require('node-uuid');

var Chatnumber={};//聊天室数
wss = new WebSocketServer({ port: 8181});
var dataIndex =0;
wss.on('connection', function (ws) {
	dataIndex += 1;
    console.log('在线总用户：'+dataIndex);	
	
	ws.on('message', function (data){
		data=JSON.parse(data);
		
		var id=data['id'];//聊天室ID
		var message=data['text'];//发送内容
		var uid=data['uid'];//用户id
		var user=data['user'];
		
		var state=data['state'];//请求数据类型，1新用户加入，2收到消息，3请求在线人员
		
		if(state==3){//state为3，返回当前房间人群信息
			var clients=Chatnumber[id]['clients'];
			var attr=[];
			for(var i in clients){
				attr.push(clients[i]['user']);
			}
			var u={'state':3,'clients':attr}
			ws.send(JSON.stringify(u));	//
			return false;		
		}
		
		
		if(!uid){//uid不存时候，创建一个uid
			var client_uuid = uuid.v4();	
		}else{
			client_uuid=uid
		}
		
		ws.uid=client_uuid;	
		ws.id=id;
		
		console.log('房间号'+id);
		if(!Chatnumber[id]){//没有房间时，创建一个房间
			var clients=[];//当前聊天室人数
			clients.push({'uid':client_uuid, "ws": ws,'user':user});			
			var obj={'id':id,'clients':clients};
			Chatnumber[id]=obj;
			var u={'state':1,'uid':client_uuid}
			ws.send(JSON.stringify(u));	//反馈uid
		}else{
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
				var u={'state':1,'uid':client_uuid}
				ws.send(JSON.stringify(u));
				return false;
			}else{//用户存在，重新存值
				clients[index]['ws']=ws;
				console.log('存在');
			}
			var obj=Chatnumber[id];
		}
		//console.log(Chatnumber);
		
		if(message){
			//收到消息就发送
			wsSend(obj,message,client_uuid,user);
		}
    });
	

	
	ws.on('close',function(data){
		//删除数组
		var id=ws.id;
		var uid=ws.uid;		
		var clients=Chatnumber[id]['clients'];
		for(var i in clients){
				if(clients[i]['uid']==uid){
					clients.splice(i,1);
					break;
				}
		}
		dataIndex -= 1; 
		console.log('在线总用户：'+dataIndex);
	});
	
});



function wsSend(data,message,uid,user){//发送想关房间发送
	for(var i=0;i<data.clients.length;i++){
		var clientSocket = data.clients[i].ws;
		if(clientSocket.readyState=== 1){
			clientSocket.send(JSON.stringify({
				'obj':message,
				'uid':uid,
				'user':user
			}));
		}
	}
	
}


