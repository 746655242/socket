define(function(){
	return{
		GetDateT:function(){
			  var d,s;
			  d = new Date();
			  s = '';         //取年份
			if (d.getHours() < 10) {
				s += "0" + d.getHours() + ":";
			} else {
				s += d.getHours() + ":";
			}
			if (d.getMinutes() < 10) {
				s += "0" + d.getMinutes() + ":";    //取分
			} else {
				s += d.getMinutes() + ":";    //取分
			}
			if(d.getSeconds() < 10){
				s += "0" + d.getSeconds();
			} else {
				s += d.getSeconds();         //取秒
			}
			  return(s);   
		} 
	}
});