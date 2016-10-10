var mongoose = require("mongoose");
// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
//骨架模版
var movieSchema = new Schema({
	name     : String,//用户名
    pw       : String,//密码
	nickname :String,//昵称
	pic      :String,//头像
	tel      :String,//电话
	email    :String,//邮箱
	type     :String,//用户类型
	date     :Date //时间
})
//模型
mongoose.model('User', movieSchema);
//存储数据


