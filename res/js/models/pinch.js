define(['hammer'],function(Hammer){// 图片手式操作事件处理
	return{
		init:function(data){//（操作idname,处理图片id的name,rethis手离开函数，上个函数对象）
			//var data={'famian':obox,"img":oimg,'end':rethis,'obj':upthis,'tap':ontap}
			var obox=data.famian;//触发面
			var oimg=data.img;//移动图片
			var rethis=data.end;//手指离开束事件
			var upthis=data.obj;//上级入对象，方便回调事件，使用
			var ontap=data.tap;//单击事件
			
			
			window._this=this;//方便传参
			_this.rethis=rethis;
			_this.upthis=upthis;	
			_this.obox= document.getElementById(obox);
			_this.oimg= document.getElementById(oimg);
			
			
			_this.transform={'scale':1,'x':0,'y':0};//默认	
			var mc=new Hammer.Manager(_this.obox);
			mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
			mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
			mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
			mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);
			mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
			mc.add(new Hammer.Tap({ event: 'singletap'}));
			
			mc.get('doubletap').recognizeWith('singletap');
   			mc.get('singletap').requireFailure('doubletap');
				
			
		
			mc.on("pinchstart pinchmove",this.onpinchin);
			mc.on("panstart panmove",this.onPan);
			if(ontap){mc.on("singletap",ontap);}
			mc.on("doubletap",this.ondoubletap);
			if(rethis){	mc.on('panend',rethis);}
			
		},
		onPan:function(ev){//拖动事件
			console.log('2');
			if(ev.type == 'panstart') {
				x=_this.transform['x']||0;
				y=_this.transform['y']||0;
			}		
			_this.transform['x']=x+ev.deltaX;
			_this.transform['y']=y+ev.deltaY;
			_this.updateElementTransform();
		},
		onpinchin:function(ev){//缩放事件
				if(ev.type == 'pinchstart') {
					initScale = _this.transform.scale || 1;
				}				
				var scale=initScale*ev.scale;
				if(scale<3){//当放大3倍不许放大
					_this.transform['scale']=scale;	
				}
				_this.updateElementTransform();	
		},
		ondoubletap:function(ev){//放大事件
			if(_this.transform.scale<3){//不许放3倍		
				var scale=_this.transform.scale*1.4;
				_this.transform['scale']=scale;			
				_this.updateElementTransform();
			}else{
				alert('图片再放大失真！');
			}
		},
		updateElementTransform:function(){//操作动作执行	
			 var oimg=_this.oimg;	 
			 var value = [
				'translate3d(' + _this.transform.x + 'px, ' + _this.transform.y + 'px, 0)',
				'scale(' + _this.transform.scale + ', ' + _this.transform.scale + ')',
			 ];
			value = value.join(" ");
			oimg.style.webkitTransform = value;
			oimg.style.mozTransform = value;
			oimg.style.transform = value;
		}		
	}

});