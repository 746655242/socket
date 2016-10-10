define(['jquery','models/uppic','models/edit','models/pinch','models/base'],function($,Up,edit,Pinch,Base){
	var chat={
		init:function(){
			var _this=this;
			_this.ws = new WebSocket(Base.config['ws']);
			
			$('.chatbtn').on('click',function(){
				_this.userbtn();		
			});
			
			$('.hei-bg').on('click',function(){
				$('.hei-bg').hide();
			});
			$('.user-info').on('click',function(event){
				 event.stopPropagation();
			});
			this.socket();			
		},
		fanjlist:function(data){//房间加载处理
			var attr=data['attr']; 
			if(attr.length!==0){
				var html='';
				for(var i in attr){
					var pic=attr[i]['pic'];
					var id=attr[i]['id'];
					var miaoshu=attr[i]['miaoshu'];
					var renshu=attr[i]['renshu'];
					var title=attr[i]['title'];
					var ge=attr[i]['ge'];
					html += '<li class="box"><a href="/chat/'+id+'">'+
								'<img class="" src="'+pic+'">'+
								'<div class="img_title box">'+miaoshu+'</div>'+
								'<div class="bot_title box">'+
										'<span class="main-title fl">'+title+'</span>'+
										'<span class="people_number fr">'+ge+'</span>'+
									'</div>'+
						   '</a></li>';
				}
			}else{
				var html='<div class="tc">当前没有聊天室</div>';
			}
			$('.chat-list-ul').html(html);
			
		},
		send:function(obj,_this){//发送消息	
			for(var i=0;i<obj['pic'].length;i++){
				var img=obj['pic'][i];
				if(img['width']>320&&!(/image\/gif/g).test(img['src'])){//当图片大于320进行压缩
					_this.thumbnail(obj['pic'][i],function(imgdata){
						_this.pic.push(imgdata);
					});
				}else{
					_this.pic.push(img);
				}
				
			}
			setTimeout(function(){	
				_this.uid=localStorage.uid;	
				obj['pic']=_this.pic;	
				obj['date']=Base.GetDateT();
				var otext={'state':2,'id':_this.id,'text':obj,'uid':_this.uid,'user':user};//房间号，数据对象，用户ID
				var string =JSON.stringify(otext);
				_this.ws.send(string);
				console.log('发送成功');
			},100);
		},
		message:function(data){//来新消息
			var _this=this;
			console.log(data);
			var user=data['user'];
			console.log("数据已接收...");
		},
		socket:function(){
			var _this=this;
			_this.ws.onopen = function(){//打开
				var otext={'state':4};
				var string = JSON.stringify(otext)
				_this.ws.send(string);
				return false;
			}
			
			_this.ws.onmessage=function(evt){//收到消息
				var data =eval('('+evt.data+')');//转对象
				var state=data['state'];
				if(state==4){//房间列信息
					console.log(data);
					_this.fanjlist(data);
					return false;
			 	}else if(state==0){//房间创建成功
					var id=data['id'];
					localStorage.uid=data['uid'];
					window.location.href='/chat/'+id;
					return false;
				}
			}
			
			_this.ws.onclose = function(e){//关闭
				 console.log("连接已关闭..."); 
			 };
			
		},
		userbtn:function(){	
			var _this=this;
			$('.hei-bg').show();			
			$('#uppic').change(function(){
						Up.init(this.files[0],src,{'width':320,'height':320,'bili':9/16});
						function src(data){
							var oimg= new Image();
							oimg.onload=function(){	
								var canvas = document.createElement("canvas");
								var context = canvas.getContext("2d");
								canvas.width = 320;//设置canvas宽
           						canvas.height = 180;//设置canvas宽
								context.drawImage(this,0,-70);//向画布上绘制图像
								var imageData = canvas.toDataURL('image/jpeg',0.6);//设置格式 
								$('#upimg').attr('src',imageData);	
							}
							oimg.src=data;
						}
			});
			
			$('#userbtn').on('click',function(){
					var pic=$('#upimg').attr('src');
					var title=$('input[name="ltitle"]').val();
					var miaoshu=$('input[name="miaoshu"]').val();
					var renshu=$('input[name="renshu"]').val();
					var pw=$('input[name="mima"]').val();
					var id=$('.chat-list-ul li').length;
					if(!title){
						alert('聊天室名称');
						return false;
					}
					if(pic=='/img/bbb.jpg'){
						alert('聊天室封面');
						return false;
					}
					var data={'state':0,'id':id,'pic':pic,'title':title,'miaoshu':miaoshu,'renshu':renshu,'pw':pw};
					if($(this).is('.on')){ return false;}
					var string = JSON.stringify(data)
					_this.ws.send(string);
					$('.hei-bg').hide();
			});

		}				
	}
	chat.init();
	
});