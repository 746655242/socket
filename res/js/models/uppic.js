define(['jquery','exif','models/pinch','models/drawipone'],function($,E,Pinch,Draw){
	return{
		init:function(data,src,options){
			var _this=this;
			var config={
				'width':200,
				'height':200
			};
			if(!data){
				return false;
			}
			options= $.extend({},config,options);//合并事件		
			_this.options=options;
			_this.width=$(window).width();
			var Mtop=_this.width/2;
			
			var html='<div id="uppicBox" style="display: block;"><div class="imageBox"><div class="thumbBox box" style="height:'+_this.width+'px;margin-top:-'+Mtop+'px"></div></div><div class="bottom"><span id="clsoe">取消</span><span id="imagebtn" class="fr">选取</span></div></div>';
			$('body').append(html);	
					
			var fileReader = new FileReader();
			fileReader.onloadend=function(e){
				_this.imgsrc=e.target.result;
				var html='<img id="pic-img" src="'+_this.imgsrc+'">';
				$('.imageBox').prepend(html);
				//设置图片垂直居中	
				$('#pic-img').load(function(){				
					_this.imgYh=$('#pic-img').height();
					_this.imgYw=$('#pic-img').width();
					_this.sizeimg(_this.width);
					_this.image=$('#pic-img');				
					_this.oimg=$('.imageBox');
					Pinch.init({'famian':'uppicBox','img':'pic-img','end':_this.onpanend,'obj':_this});
				});
					
							
				$('#imagebtn').on('click',function(){//选取
					var data;
					_this.context(function(imgdata){
						data=imgdata;		
						_this.removehtml();
						src(data);
					});	
				});
				$("#clsoe").on('click',function(){
					_this.removehtml();
				})
			}
			fileReader.readAsDataURL(data);	
		},
		onpanend:function(){//手离开事件
			var scale=_this.transform['scale'];
			var tx=_this.transform['x'];
			var ty=_this.transform['y'];
			
			var w=_this.upthis.imgw*scale;
			var h=_this.upthis.imgh*scale;
			var ww=_this.upthis.width;
			
			var left=(w-ww)/2;
			var right=(ww-w)/2;
			var top=(h-ww)/2;
			var bottom=(ww-h)/2;
			
			if(scale<1){//不满一屏
				scale=1;	
				if(h>w){tx=0}else{ty=0;}
			}else{
				if(tx>left){
					tx=left;
					console.log('过left底线');
				}else if(tx<right){
					tx=right;
					console.log('过right底线');
				}
				if(ty>top){
					ty=top;
					console.log('过top底线');
				}else if(ty<bottom){
					ty=bottom;
					console.log('过bottom底线');
				}			
			}			
			_this.transform['scale']=scale;
			_this.transform['x']=tx;
			_this.transform['y']=ty;
			_this.updateElementTransform();				
		},		
		sizeimg:function(Width){
				if(this.imgYh>=this.imgYw){
					$('#pic-img').css({'width':Width+'px'});
					this.imgh=$('#pic-img').height();
					this.imgw=$('#pic-img').width();
				}else{
					$('#pic-img').css({'height':Width+'px'});
					this.imgh=$('#pic-img').height();
					this.imgw=$('#pic-img').width();
				}
				$('#pic-img').css({'margin-left':this.imgw/-2+'px','margin-top':(this.imgh/-2)+'px'});
		}	
		,
		removehtml:function(){
			$('#uppicBox').remove();
		},
		context:function(imgdata){//图片截取
			var image=document.getElementById("pic-img");			
			var canvas = document.createElement("canvas");
			console.log(_this);
			
			//缩放值 
			var scale=_this.transform['scale'];
			var tx=_this.transform['x'];
			var ty=_this.transform['y'];
	
			var w=0;
			var margintop=(this.imgh*scale-this.width)/2;
			var marginleft=(this.imgw*scale-this.width)/2;
			var bili=this.imgYh/(this.imgh*scale);
			
			
			if(this.imgYh>this.imgYw){
				w=this.imgYw;
			}else{
				w=this.imgYh;
			}
			var sw=w/scale;
			var sh=w/scale; 
			var sx=(marginleft-tx)*bili;
			var sy=(margintop-ty)*bili;
			var dw=this.options['width'];//设置高
			var dh=this.options['width'];//设置高
			canvas.width = dw;//设置canvas宽
            canvas.height = dh;//设置canvas宽
			
			var context = canvas.getContext("2d");
			var Orientation;
			EXIF.getData(image, function(){
			  Orientation=EXIF.getTag(this, 'Orientation');
			});		
			if(Orientation>1){//苹果你大爷，老子搞定你了.
				Draw.drawPhoto(image,Orientation,function(imageData,shuoxiao){
					var oimg= new Image();
					oimg.onload=function(){				
						context.drawImage(this,sx/shuoxiao,sy/shuoxiao,sw/shuoxiao,sw/shuoxiao,0,0,dw,dh);//向画布上绘制图像
						var imageData = canvas.toDataURL('image/jpg');//设置格式  
						imgdata(imageData);
					}
					oimg.src=imageData;	
				});
			}else{
				context.drawImage(image,sx,sy,sw,sw,0,0,dw,dh);//向画布上绘制图像
				var imageData = canvas.toDataURL('image/jpg');//设置格式  
				imgdata(imageData);
			}
			
		}
	}
});