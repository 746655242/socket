define(function(){// iphone上传图片90旋转事件处理
	return{
		drawPhoto:function(img,dir,next){//参数img对象，dir是图片旋转值
			var image=new Image();
			image.onload=function(){
				var degree=0,drawWidth,drawHeight,width,height,shuoxiao=1;
				drawWidth=this.naturalWidth;
				drawHeight=this.naturalHeight;
				//压缩图片方便旋转
				var maxSide = Math.max(drawWidth, drawHeight);
				if (maxSide > 1024) {
					var minSide = Math.min(drawWidth, drawHeight);
					shuoxiao=maxSide/1024;
					minSide = minSide / maxSide * 1024;
					maxSide = 1024;
					if (drawWidth > drawHeight) {
					  drawWidth = maxSide;
					  drawHeight = minSide;
					} else {
					  drawWidth = minSide;
					  drawHeight = maxSide;
					}
				}					
				var canvas = document.createElement("canvas");
				canvas.width=width=drawWidth;
			    canvas.height=height=drawHeight; 
			    var context=canvas.getContext('2d');
				switch(dir){
					//iphone横屏拍摄，此时home键在左侧
					case 3:
					  degree=180;
					  drawWidth=-width;
					  drawHeight=-height;
					  break;
					//iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
					case 6:
					  canvas.width=height;
					  canvas.height=width; 
					  degree=90;
					  drawWidth=width;
					  drawHeight=-height;
					  break;
					//iphone竖屏拍摄，此时home键在上方
					case 8:
					  canvas.width=height;
					  canvas.height=width; 
					  degree=270;
					  drawWidth=-width;
					  drawHeight=height;
					  break;
			  }
			//使用canvas旋转校正
			  context.rotate(degree*Math.PI/180);
			  context.drawImage(image,0,0,drawWidth,drawHeight);			
			  var imageData = canvas.toDataURL('image/jpg');//设置格式   
			  if(dir==6||dir==8){//90度和270度长宽高对调
			  		next(imageData,shuoxiao,Math.abs(height),Math.abs(width));//参数图片base64编码，图片缩小比例默认为1
			  }else{
			  		next(imageData,shuoxiao,Math.abs(width),Math.abs(height));//参数图片base64编码，图片缩小比例默认为1
			  }
			};
			image.src=img.src;
		}
	}

});