var mongoose = require("mongoose");
var user = mongoose.model('user');//引入模型

var path = require('path'); //a module to calculate a path

module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // login
    var flag;
    app.post('/api/login', function (req, res) {
        console.log(req.body.username);
        console.log(req.body.password);
        var query_doc = { user_id: req.body.username, password: req.body.password };
        user.count(query_doc, function(err, doc){
            console.log(doc);
            if(doc === 0){
                flag = false;
            }else{
                flag = true;
            }        
            res.json(flag);
        });
    });

    app.post('/api/information', function (req, res) {
        var query_doc = {user_id: req.body.username};
        user.find(query_doc).exec(function(err,result){
            if(err) throw err;
            console.log(result);
            console.log(result[0]);
            res.json(result); //res.data[0].*
        });
    });

    app.post('/api/operation', function (req, res) {
        let userId = req.body.username;
        let type = req.body.type;//1（存款)2（取款）3（购买定期）4（购买基金）5（购买股票）
        let account = Number(req.body.account);
        var query_doc = {user_id: userId};
        var nowuser={};
        let operationSuccess = true;
        user.find(query_doc).exec(function(err,result){
            var Balance=Number(result[0].account);
            var dingQi=Number(result[0].dingqi);
            var fund=Number(result[0].fund);
            var stock=Number(result[0].stock);
            if (type === 1) Balance += account;
            else if (type === 2) {
                if (Balance < account) 
                    operationSuccess = false; 
                else Balance -= account;
            }
            else if (type === 3) {
                if (Balance < account) 
                    operationSuccess = false; 
                else{
                    Balance -= account;
                    dingQi += account;
                }
            }else if (type === 4){
                if (Balance < account) 
                    operationSuccess = false; 
                else {
                    Balance -= account;
                    fund += account;
                }
            }else if (type === 5){
                if (Balance < account) 
                    operationSuccess = false;
                else { 
                    Balance -= account;
                    stock += account;
                }
            }
            nowuser.account=Balance;
            nowuser.dingQi=dingQi;
            nowuser.fund=fund;
            nowuser.stock=stock;
            console.log(nowuser);
            if (operationSuccess){
                user.update(query_doc,nowuser,function(err,res){
                    if (err) throw err;
                    console.log("文档更新成功");
            })}
        });
    
        res.json(operationSuccess);
    });

    app.post('/api/transfer', function (req, res) {
        let getUser = req.body.username;
        let accepterId = req.body.acceptername;
        let account = req.body.account;
        let result = 0, hasAccepter = true;
        
        var acc_query={user_id:accepterId};
        user.count(acc_query, function(err, doc){
            if(doc===0){
                hasAccepter = false;
            }
        });
        if (!hasAccepter) 
            result = 2; 
        else{
            var userBalance;
            var query_doc = {user_id: getUser};
            user.find(query_doc,function(err,res){
                userBalance=res[0].account;
            });
            var accepterBalance;
            user.find(acc_query,function(err,res){
                accepterBalance=res[0].account;
            })
            if (account > userBalance) 
                result = 1;
            else {
                result = 3;
                userBalance -= account;
                accepterBalance += account;

                var userup={account:userBalance};
                user.update(query_doc,userup,function(err,res){
                    if (err) throw err;
                    console.log("文档更新成功");
                });

                var up={account:accepterBalance};
                user.update(acc_query,up,function(err,res){
                    if (err) throw err;
                    console.log("文档更新成功");
                });
                }
        }    
        res.json(result);
    });

    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public','app.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
    app.get('*', function (req, res) {
        res.send(404); // load the single view file (angular will handle the page changes on the front-end)
    });
};
