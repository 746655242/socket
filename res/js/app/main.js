define(['jquery','models/uppic','models/edit','models/pinch'],function($,Up,edit,Pinch){
	var chat={
		init:function(){
			var _this=this;
			_this.id=1;//聊天室id
			_this.uid=localStorage.uid;	
			_this.ws = new WebSocket("ws://hemaj.com:8181");

			this.imbox();
			this.socket();
			this.slide();
			this.online();
			this.privatechat();
			edit.init(_this);//传后评论事件
		},
		imbox:function(){
			var h=$(window).height()-$('.home-header').height()-$('.comment').height();;
			$('.im').height(h);
			
		},
		send:function(obj,_this){//发送消息	
			_this.pic=[];
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
				var otext={'id':_this.id,'text':obj,'uid':_this.uid,'user':user};//房间号，数据对象，用户ID
				var string =JSON.stringify(otext);
				_this.ws.send(string);
				console.log('发送成功');
			},100);
		},
		message:function(data){//来新消息
			var _this=this;
			console.log(data);
			var user=data['user'];
			var obj=data['obj'];
			var uid=data['uid'];
			
			var pic='';
			for(var i=0;i<obj['pic'].length;i++){
				pic=pic+'<img  style="width:100px"  data-w="'+obj['pic'][i]['width']+'" data-h="'+obj['pic'][i]['height']+'" class="max-pic"  src="'+obj['pic'][i]['src']+'">';
			}
			
			if(uid==_this.uid){
				var html='<div class="im-news im-fr "><div class="im-line"><div class="im-icon"><img src="'+user['pic']+'"></div><div class="im-name">'+user['name']+'</div><div class="im-text  fr"><i class="triangle"></i><span></span>'+pic+obj['text']+'</div></div></div>';
			}else{
				var html='<div class="im-news"><div class="im-line "><div class="im-icon"><img src="'+user['pic']+'"></div><div class="im-name">'+user['name']+'</div><div class="prelative im-text rds-5"><i class="triangle"></i><span></span>'+pic+obj['text']+'</div></div></div>';
				
			}

			this.scrolltop(html); 
			this.maxpic();
			console.log("数据已接收...");
		},
		socket:function(){
			var _this=this;
			
			_this.ws.onopen = function(){//打开
				var otext={'id':_this.id,'uid':_this.uid,'user':user};
				var string = JSON.stringify(otext)
				_this.ws.send(string);
			}
			
			_this.ws.onmessage=function(evt){//收到消息
				var data =eval('('+evt.data+')');//转对象
				var state=data['state'];
				if(state==1){//状态为1时，创建新ID
					localStorage.uid=data['uid'];		
					return false;
			 	}
				_this.message(data);
			}
			
			_this.ws.onclose = function(e){//关闭
				 console.log("连接已关闭..."); 
			 };
		},
		scrolltop:function(html){//dom处理
			$('.im-mian').append(html);
			var top=$('.im-mian').height();
			$('.im').animate({'scrollTop':top+'px'});	
		},
		thumbnail:function(data,next){//缩略图
			var _this=this;
			var canvas = document.createElement("canvas");
			var context = canvas.getContext("2d");
			var width=320;
			var height=data.height*320/data.width;
			canvas.width = width;
            canvas.height = height;	
			
			var img=new Image()
			img.onload=function(){
				context.drawImage(img,0,0,data.width,data.height,0,0,width,height);
				if((/image\/jpeg/g).test(data.src)){
					//console.log('图片为jpg');
					var imageData = canvas.toDataURL('image/jpeg');//设置格式
				}else if((/image\/png/g).test(data.src)){
					//console.log('图片为png');
					var imageData = canvas.toDataURL('image/png');//设置格式
				}
				var obj={'width':width,'height':height,'src':imageData};
				next(obj);//返回图片
				
			}
			img.src=data.src;
		
			
		
				
		},
		maxpic:function(){//显示大图
			var _this=this;
			$('.max-pic').on('click',function(){
				var src=$(this)[0]['src'];
				var w=$(this).data('w');
				var h=$(this).data('h');
				var width=$(window).width();
				var top=width*h/w/-2;
				
				
				$('body').append('<div class="layer_bg"><div id="picbox" class="picbox"></div><img id="picimg" src="'+src+'" width="100%" style="top:50%;position:absolute;margin-top:'+top+'px"></div>');
				$('.layer_bg').show();
				
				console.log('11');

				Pinch.init({'famian':'picbox',"img":'picimg','origin':1,'end':_this.onpanend,'tap':function(){
					$('.layer_bg').remove();
					console.log('删除成功');
				}});
			});	

			
			$('body').on('click','.layer_bg',function(){
				$('.layer_bg').remove();
			});
			
			$('body').on('click','.layer_bg img',function(e){
				e.stopPropagation();
			});
				
		},
		slide:function(){//上滑
			$('.im').scroll(function(){
				var top=$('.im').scrollTop();
				if(top==0){
					console.log('22');
				}
				
			});		
		},
		online:function(){//查看在线人数
			$('#online').on('click',function(){
				$('.home-header').hide();
				$('.chat-box').hide();
				$('.comment').hide();
				$(".people-mian").show();
			});	
			$('#colse-p').on('click',function(){
				$('.home-header').show();
				$('.chat-box').show();
				$('.comment').show();
				$(".people-mian").hide();

			});
		},
		privatechat:function(){
			$('.im-icon').on('click',function(){
					var name=$(this).data('name');
					var tval='对 "'+name+'" 说：';
					$('#edit-text').val(tval);
					$('#edit-text').focus();
			});	
		},
		userbtn:function(){
			if(!user){	
				$('.hei-bg').show();			
				$('#uppic').change(function(){
						Up.init(this.files[0],src,{'width':250,'height':250});
						function src(data){
							$('#upimg').attr('src',data);	
						}
				});
				
				$('#userbtn').on('click',function(){
						var name=$('#upname').val();
						var pic=$('#upimg').attr('src');
						var data={"name":name,"pic":pic}
						
						if($(this).is('.on')){ return false;}
						$(this).addClass('on');
						
						$.ajax({
							 type: "POST", // 默认:GET 请求方式:[POST/GET]
							 url: "/api/user", // 默认当前地址,发送请求的地址
							 data:data,
							 error: function(XMLHttpRequest, textStatus, errorThrown){ $('#userbtn').removeClass('on'); }, // 请求失败时调用
							 timeout: 6000, // 设置请求超时时间
							 success: function(msg){
								localStorage.user=msg;
								user=eval('('+msg+')');
								$('.hei-bg').hide();
								chat.init();
							}
						});
				});
			
			}else{
				chat.init();
			}
		}				
	}
	var user=eval('('+localStorage.user+')');
	chat.userbtn();
});