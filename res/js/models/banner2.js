define(['jquery'],function($){
	return{	
		shu:0,//当前显示页
		yidong:0,
		boo:false,
		banner:function(id){
			_this=this;
			var id=$(id);
			this.id=id;
			this.oWidth=id.width();
			this.ge=id.find('.ul').length;//图片数量
			
			var html=document.createElement('div');
			html.setAttribute('class','pointer');
			for(var i=0;i<this.ge;i++){
				id.find('.ul').eq(i).css({'width':this.oWidth,'left':this.oWidth*-i});
				if(i==0){
					$(html).append('<i class="on" >'+i+'</i>');
					
				}else{
					$(html).append('<i>'+i+'</i>');
				}
			}
			id.append(html);//追加远切换
			this.zin(id);//设置起点

			id.on('touchstart',{'fn':_this},this.touchTU);//手指接触事件
			id.on('touchmove',{'fn':_this},this.touchMoveTU);//手指移动中事件
			id.on('touchend',{'fn':_this},this.touchEndTU);//手指离开事件
		},
		touchTU:function(evt){//手指接触事件
			
			_this=evt.data.fn;
			var touch = evt.originalEvent.touches[0]; //获取第一个触点
			_this.x = Number(touch.pageX);
			
		},
		touchMoveTU:function(evt){//手指移动中事件
		
			_this=evt.data.fn;
			evt.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动等
			
			var touch = evt.originalEvent.touches[0]; //获取个触点
			var x = Number(touch.pageX); //页面触点X坐标
			_this.yidong=x-_this.x;//移动距离
		
			
			$('#'+this.id).find('.ul').eq(_this.shu).css({"transform": "translate3d("+_this.yidong+"px, 0px, 0px)"});
			
			if(_this.yidong<0){
				var xia=(_this.shu==_this.ge-1)?xia=0:xia=_this.shu+1;
				var yidong=_this.oWidth+_this.yidong;
				$('#'+this.id).find('.ul').eq(xia).css({"transform": "translate3d("+yidong+"px, 0px, 0px)"});
				
			}else{
				var xia=(_this.shu==0)?xia=_this.ge-1:xia=_this.shu-1;
				var yidong=_this.yidong-_this.oWidth;
				$('#'+this.id).find('.ul').eq(xia).css({"transform": "translate3d("+yidong+"px, 0px, 0px)"});
			}
			
			
		},
		touchEndTU:function(evt){//手指离开事件
			_this=evt.data.fn;			
			//左滑

			if(_this.yidong<0&&Math.abs(_this.yidong)>_this.oWidth/4){
				
				
				var xia=(_this.shu==_this.ge-1)?xia=0:xia=_this.shu+1;
				_this.shu=xia;	
	
			}else if(_this.yidong>0&&Math.abs(_this.yidong)>_this.oWidth/4){
				var xia=(_this.shu==0)?xia=_this.ge-1:xia=_this.shu-1;
				_this.shu=xia;
			}
			_this.yidong=0;
			_this.zin();
			
			
		},
		zin:function(id){//设置on
			if(!id){
				this.id.find('.ul').removeClass('on');
				this.id.find('.ul').removeClass('z-ix').css({"transition-duration": "400ms"});//清除
			}
			$('.pointer').find('i').removeClass('on');
			$('.pointer').find('i').eq(this.shu).addClass('on');
			this.id.find('.ul').removeClass('z-ix').css({"transform":"translate3d(0px, 0px, 0px)"});//清除
			
			this.id.find('.ul').eq(this.shu).addClass('z-ix').addClass('on').css({"transform":"translate3d(0px, 0px, 0px)"});
			
			var prev=(this.shu==0)?this.ge-1:this.shu-1;
			this.id.find('.ul').eq(prev).addClass('z-ix').css({"transform":"translate3d("+this.oWidth*-1+"px, 0px, 0px)"});
			
			var next=(this.shu==this.ge-1)?0:this.shu+1;
			this.id.find('.ul').eq(next).addClass('z-ix').css({"transform":"translate3d("+this.oWidth+"px, 0px, 0px)"});
			
		}
		
		
	}
});