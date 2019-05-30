var mongoose = require("mongoose"); //引入mongoose

var ListSchema = new mongoose.Schema({
    user_id: String, //定义一个账户属性user_id，类型为String
    key: String, //定义一个密码属性key，类型为String
    account:Number,//定义一个存款属性account，类型为int32
    dingqi:Number,//定义一个定期存款属性dingqi，类型为int32
    foud:Number,//定义一个基金属性foud，类型为int32
    stock:Number,//定义一个股票属性shares，类型为int32
});
mongoose.model('user', ListSchema);
module.exports = mongoose;