var mongoose = require("mongoose"); //引入mongoose
mongoose.connect('mongodb://database/list'); //连接到mongoDB的todo数据库

var ListSchema = new mongoose.Schema({
    user_id: String, //定义一个账户属性user_id，类型为String
    password: String, //定义一个密码属性key，类型为String
    account:Number,//定义一个存款属性account，类型为int32
    dingqi:Number,//定义一个定期存款属性dingqi，类型为int32
    fund:Number,//定义一个基金属性fund，类型为int32
    stock:Number,//定义一个股票属性shares，类型为int32
});

var user=mongoose.model('user', ListSchema);

var ins={user_id:"admin",password:"admin",account:100000,dingqi:0,fund:100000,stock:0};
var adminname={user_id:"admin"};
user.count(adminname,function(err,doc){
  if(doc===0){
      user.insertMany(ins,function(err,res){});
  }
})

var ins2={user_id:"user1",password:"user1",account:5000,dingqi:120,fund:50,stock:10000};
var username={user_id:"user1"};
user.count(username,function(err,doc){
  if(doc===0){
      user.insertMany(ins2,function(err,res){});
  }
})

module.exports = mongoose;
