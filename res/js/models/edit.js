define(['jquery','models/banner2','exif','models/drawipone'],function($,Be,E,Draw){
	return{
		init:function(obj){
			var _this=this;
			this.obj=obj;
			var url='./img/biaoqing/';
			var html='<link id="jsbaoqin" rel="stylesheet" href="./css/baoqin.css"><div id="comment" class="comment"><div class="edit"><input id="edit-text" type="text" placeholder="回复楼主" /><i class="icon btn-b edit-b"></i><i class="icon u-pic edit-pic"><input id="picfile" class="picfile" type="file" multiple></i><i id="send" class="edit-send">发送</i></div><div class="biaoqing box" id="biaoqing" style="display:none"><div class="ul box"><ul><li><a href="javascript:;"><img data-id="傲慢" data-src="'+url+'b-1.png" src=".'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="白眼" data-src="'+url+'b-2.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="鄙视" data-src="'+url+'b-3.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="闭嘴" data-src="'+url+'b-4.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="憋嘴" data-src="'+url+'b-5.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="擦汗" data-src="'+url+'b-6.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="呲牙" data-src="'+url+'b-7.png" src="'+url+'b-default.png"></a></li></ul><ul><li><a href="javascript:;"><img data-id="大兵" data-src="'+url+'b-8.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="大哭" data-src="'+url+'b-9.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="呆" data-src="'+url+'b-10.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="得意" data-src="'+url+'b-11.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="发怒" data-src="'+url+'b-12.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="奋斗" data-src="'+url+'b-13.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="尴尬" data-src="'+url+'b-14.png" src="'+url+'b-default.png"></a></li></ul><ul><li><a href="javascript:;"><img data-id="鼓掌" data-src="'+url+'b-15.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="哈欠" data-src="'+url+'b-16.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="害羞" data-src="'+url+'b-17.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="憨笑" data-src="'+url+'b-18.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="坏笑" data-src="'+url+'b-19.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img data-id="饥饿" data-src="'+url+'b-20.png" src="'+url+'b-default.png"></a> </li><li><a href="javascript:;"><img class="delete" data-id="删除" data-src="'+url+'b-delete.png" src="'+url+'b-default.png"></a></li></ul></div><div class="ul box"><ul><li><img data-id="惊恐" data-src="'+url+'b-21.png" src="'+url+'b-default.png"></li><li><img data-id="惊讶" data-src="'+url+'b-22.png" src="'+url+'b-default.png"></li><li><img data-id="可爱" data-src="'+url+'b-23.png" src="'+url+'b-default.png"></li><li><img data-id="可怜" data-src="'+url+'b-24.png" src="'+url+'b-default.png"></li><li><img data-id="抠鼻" data-src="'+url+'b-25.png" src="'+url+'b-default.png"></li><li><img data-id="骷髅" data-src="'+url+'b-26.png" src="'+url+'b-default.png"></li><li><img data-id="酷" data-src="'+url+'b-27.png" src="'+url+'b-default.png"></li></ul><ul><li><img data-id="快哭了" data-src="'+url+'b-28.png" src="'+url+'b-default.png"></li><li><img data-id="困" data-src="'+url+'b-29.png" src="'+url+'b-default.png"></li><li><img data-id="冷汗" data-src="'+url+'b-30.png" src="'+url+'b-default.png"></li><li><img data-id="流汗" data-src="'+url+'b-31.png" src="'+url+'b-default.png"></li><li><img data-id="流泪" data-src="'+url+'b-32.png" src="'+url+'b-default.png"></li><li><img data-id="难过" data-src="'+url+'b-33.png" src="'+url+'b-default.png"></li><li><img data-id="敲打" data-src="'+url+'b-34.png" src="'+url+'b-default.png"></li></ul><ul><li><img data-id="亲亲" data-src="'+url+'b-35.png" src="'+url+'b-default.png"></li><li><img data-id="糗大了" data-src="'+url+'b-36.png" src="'+url+'b-default.png"></li><li><img data-id="色" data-src="'+url+'b-37.png" src="'+url+'b-default.png"></li><li><img data-id="睡觉" data-src="'+url+'b-38.png" src="'+url+'b-default.png"></li><li><img data-id="调皮" data-src="'+url+'b-39.png" src="'+url+'b-default.png"></li><li><img data-id="偷笑" data-src="'+url+'b-40.png" src="'+url+'b-default.png"></li><li><img class="delete" data-id="删除" data-src="'+url+'b-delete.png" src="'+url+'b-default.png"></li></ul></div><div class="ul box"><ul><li><img data-id="吐" data-src="'+url+'b-41.png" src="'+url+'b-default.png"></li><li><img data-id="微笑" data-src="'+url+'b-42.png" src="'+url+'b-default.png"></li><li><img data-id="委屈" data-src="'+url+'b-43.png" src="'+url+'b-default.png"></li><li><img data-id="吓" data-src="'+url+'b-44.png" src="'+url+'b-default.png"></li><li><img data-id="嘘" data-src="'+url+'b-45.png" src="'+url+'b-default.png"></li><li><img data-id="疑问" data-src="'+url+'b-46.png" src="'+url+'b-default.png"></li><li><img data-id="阴险" data-src="'+url+'b-47.png" src="'+url+'b-default.png"></li></ul><ul><li><img data-id="再见" data-src="'+url+'b-50.png" src="'+url+'b-default.png"></li><li><img data-id="折磨" data-src="'+url+'b-51.png" src="'+url+'b-default.png"></li><li><img data-id="咒骂" data-src="'+url+'b-52.png" src="'+url+'b-default.png"></li><li><img data-id="抓狂" data-src="'+url+'b-53.png" src="'+url+'b-default.png"></li><li><img data-id="左哼哼" data-src="'+url+'b-54.png" src="'+url+'b-default.png"></li><li><img data-id="右哼哼" data-src="'+url+'b-48.png" src="'+url+'b-default.png"></li><li><img data-id="晕" data-src="'+url+'b-49.png" src="'+url+'b-default.png"></li></ul><ul><li><img data-id="再见" data-src="'+url+'b-50.png" src="'+url+'b-default.png"></li><li><img data-id="折磨" data-src="'+url+'b-51.png" src="'+url+'b-default.png"></li><li><img data-id="咒骂" data-src="'+url+'b-52.png" src="'+url+'b-default.png"></li><li><img data-id="抓狂" data-src="'+url+'b-53.png" src="'+url+'b-default.png"></li><li><img data-id="左哼哼" data-src="'+url+'b-54.png" src="'+url+'b-default.png"></li><li><img data-id="右哼哼" data-src="'+url+'b-48.png" src="'+url+'b-default.png"></li><li><img class="delete" data-id="删除" data-src="'+url+'b-delete.png" src="'+url+'b-default.png"></li></ul></div><div class="ul box"><ul><li><img data-id="吐" data-src="'+url+'b-41.png" src="'+url+'b-default.png"></li><li><img data-id="微笑" data-src="'+url+'b-42.png" src="'+url+'b-default.png"></li><li><img data-id="委屈" data-src="'+url+'b-43.png" src="'+url+'b-default.png"></li><li><img data-id="吓" data-src="'+url+'b-44.png" src="'+url+'b-default.png"></li><li><img data-id="嘘" data-src="'+url+'b-45.png" src="'+url+'b-default.png"></li><li><img data-id="疑问" data-src="'+url+'b-46.png" src="'+url+'b-default.png"></li><li><img data-id="阴险" data-src="'+url+'b-47.png" src="'+url+'b-default.png"></li></ul><ul><li><img data-id="再见" data-src="'+url+'b-50.png" src="'+url+'b-default.png"></li><li><img data-id="折磨" data-src="'+url+'b-51.png" src="'+url+'b-default.png"></li><li><img data-id="咒骂" data-src="'+url+'b-52.png" src="'+url+'b-default.png"></li><li><img data-id="抓狂" data-src="'+url+'b-53.png" src="'+url+'b-default.png"></li><li><img data-id="左哼哼" data-src="'+url+'b-54.png" src="'+url+'b-default.png"></li><li><img data-id="右哼哼" data-src="'+url+'b-48.png" src="'+url+'b-default.png"></li><li><img data-id="晕" data-src="'+url+'b-49.png" src="'+url+'b-default.png"></li></ul><ul><li><img data-id="再见" data-src="'+url+'b-50.png" src="'+url+'b-default.png"></li><li><img data-id="折磨" data-src="'+url+'b-51.png" src="'+url+'b-default.png"></li><li><img data-id="咒骂" data-src="'+url+'b-52.png" src="'+url+'b-default.png"></li><li><img data-id="抓狂" data-src="'+url+'b-53.png" src="'+url+'b-default.png"></li><li><img data-id="左哼哼" data-src="'+url+'b-54.png" src="'+url+'b-default.png"></li><li><img data-id="右哼哼" data-src="'+url+'b-48.png" src="'+url+'b-default.png"></li><li><img class="delete" data-id="删除" data-src="'+url+'b-delete.png" src="'+url+'b-default.png"></li></ul></div></div><div class="tupian"></div></div>';
			$('body').append(html);


			this.dataimg();
			this.biaoqing();
			this.picclose();
			this.uppic();
			this.mobile();//苹果手机输入时定位
			$('#jsbaoqin').load(function(){//等样式加载完成处发事件
				Be.banner('#biaoqing');	
			});
			this.imgti();
			this.enter();
			
			//获焦处理
			$('#edit-text').focus(function(){	
				$('.btn-b').removeClass('btn-bon');
				$('#biaoqing').hide();
				$('.tupian').hide();
				$('#picfile').removeClass('on');
			});
			
			//失焦处理	
			$('#send').on('click',function(){	
				_this.send();
			});
			
		},
		send:function(){//表发评论
			var _this=this;
			
			var text = $('#edit-text').val();
			var picurl=$('.tupian img');
			_this.pic=[];
			
			
			for(var i=0; i<picurl.length;i++){
				var Orientation;
				var id='img_'+i;
				$(picurl[i]).attr('id',id);
				var image=document.getElementById(id);	
				
				EXIF.getData(image, function(){
				  Orientation=EXIF.getTag(this, 'Orientation');
				});
				if(Orientation>1){//苹果你大爷，老子搞定你了.
					var bb=Draw.drawPhoto(image,Orientation,function(d,s,w,h){
						var src=d;
						var size=d.length*3/4;
						var data={'src':src,'width':w,'height':h,'size':size}
						_this.pic.push(data);
					});				
				}else{
					var src=picurl[i].src;
					var size=$(picurl[i]).data('size');
					var width=$(picurl[i])[0]['naturalWidth'];
					var height=$(picurl[i])[0]['naturalHeight'];
					var data={'src':src,'width':width,'height':height,'size':size};
					_this.pic.push(data);	
				}
			}
			
			setTimeout(function(){
					text=_this.textimg(text);
					var datatext={'text':text,'pic':_this.pic}
					var kongke=/[\S]/g;//为空格时不发送	 				
					if((text==''||!kongke.test(text))&&_this.pic==''){
						alert('请输入评论');
						return false;
					}
					_this.obj.send(datatext,_this.obj);
					$('#edit-text').val('');//清空
					$('.tupian').html('');
					$('#biaoqing').hide();
					$('.edit-b').removeClass('btn-bon');
			},0);

		},
		imgti:function(){
			this.imgsrc={};
			var oimg=$('#biaoqing ul img');
			for(var i=0;i<oimg.length;i++){
					this.imgsrc[oimg.eq(i).data('id')]=oimg.eq(i).data('src');
			}	
			
		},
		textimg:function(text){
			var  re=/\[[^\[]+\]/g;
			var b=text.match(re);//获取表情关键
			var biao=this.imgsrc;
			for(i in b){//替换图片地址
				var hao=b[i].substr(1,b[i].indexOf(']')-1);//去除前后[]
				text=text.replace(eval('/\\['+hao+'\\]/i'),'<img  src="'+biao[hao]+'" style="width:.24rem; margin-right:.05rem">');//替换成路径
			}
			return text;

			
		},
		dataimg:function(){//表情延迟加载
			for(var i=0;i<$('.biaoqing img').length;i++){
				var src=$('.biaoqing img').eq(i).data('src');
				$('.biaoqing img').eq(i).attr('src',src);
			}	
		},
		biaoqing:function(){
			$('.btn-b').on('click',function(){
				if($(this).is('.btn-bon')){
					$(this).removeClass('btn-bon');
					$('#biaoqing').hide();;
				}else{
					$(this).addClass('btn-bon');
					$('#biaoqing').show();;
					$('.tupian').hide();
					$('#picfile').removeClass('on');
				}
			});
			//选择表情
			$('#biaoqing li img').on('click',function(){
				if($(this).is('.delete')){//删除表情
					var t=$('#edit-text').val();
					var start=t.lastIndexOf('[');
					var End=t.lastIndexOf(']');
					if(start>=0){
						var d_t=t.slice(0,start);
						var e_t=t.slice(End+1);
						$('#edit-text').val(d_t+e_t);
					}
				}else{//增加表情
					var bq='['+$(this).data('id')+']';
					var t_val=$('#edit-text').val()+bq;
					$('#edit-text').val(t_val);
				}
			});
		
		},
		picclose:function(){//发贴上传图片
			$('.tupian').on('click','.btn_close',function(){//删除图片
				$(this).parents('li').remove();
			});
		},
		uppic:function(){//图片上传
			$('#picfile').on('click',function(){
				$('.btn-bon').click();
				$('.tupian').show();
				$(this).addClass('on');
			});
			$('#picfile').change(function(){
				var shu=$('.tupian').find('li').length;
				
				if(shu>3||this.files.length>4-shu){
					alert('只能上传4张图片');
					return false;
				}

				for(var i=0;i<this.files.length;i++){
					var fileReader = new FileReader();
					fileReader.onloadend=function(e){
						$('.tupian').show();
						$('.tupian').append('<li><img  data-size="'+e.loaded+'" src="'+e.target.result+'" width="100%"><div class="icon btn_close"></div></li>');						
					}
					var name=this.files[i]['name'];
					if((/\.gif/g).test(name)||(/\.png/g).test(name)||(/\.jpg/g).test(name)){
						fileReader.readAsDataURL(this.files[i]);				
					}else{
						alert('请上传正确格式图片');
					}
				}
				
			});
			
		},
		mobile:function(){
			var box_h=$('#comment').height();
			
			//判断聊天室输入框定位
			var  u = navigator.userAgent, app = navigator.appVersion;;
			if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){ //ios终端;
				
				//uc特别加10像素	
				if(u.indexOf('UCBrowser') > -1) {
								box_h=box_h-17;
				}			
					
				$("#edit-text").focus(function(){
					var h=document.body.scrollHeight;			
					$("#comment").css({'position':'absolute','top':(h-box_h)+'px'});
					//$(window).scrollTop(h);
				}).blur(function(){
					$("#comment").css({'position':'fixed','bottom':'0px','top':'inherit'});
				});
			 }
		},
		enter:function(){//电脑回车事件 
			document.onkeydown = function(e){ 
				var ev = document.all ? window.event : e;
				if(ev.keyCode==13) {
					$('#send').click();
				}
			}
		}	
		
		
	}
});