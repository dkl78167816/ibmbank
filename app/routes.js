//var Todo = require('./models/todo');
var user = mongoose.model('user');//引入模型
var path = require('path'); //a module to calculate a path

module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // login
    app.post('/api/login', function (req, res) {
        // use mongoose to get login info in the database
        //need write connect db and get password & username
        var query_doc = { user_id: req.body.usename, password: req.body.password };
        user.count(query_doc, function(err, doc){
            if(doc === 1){//验证成功,转到mainpage
                flag=true;
                res.redirect('/mainpage');
                res.json(flag);
            }else{
                res.redirect('/login');
                res.json(flag);
            }        
        });
        // let password, username;
        // let login = false;
        // if (req.body.password === password && req.body.password === username)
        // {
        //     login = true;
        // }
        // res.json(login);
    });

    app.post('/api/information', function (req, res) {
        var query_doc = {user_id: req.data.username};
        user.find(query_doc).exec(function(err,result){
            if(err) throw err;
            res.json(result); //res.data[0].*
        });
        // let getUser = req.body.userId;
        // //need write connect db and get userinfo
        // let userName, userBalance, fixedTimeDeposit, fund, stock;
        // let userInfo = {
        //     userName: userName,
        //     userBalance: userBalance,
        //     fixedTimeDeposit: fixedTimeDeposit,
        //     fund: fund,
        //     stock: stock
        // };
        // res.json(userInfo);
    });

    app.post('/api/operation', function (req, res) {
        let getUser = req.body.userId;
        let type = req.body.type;//1（存款)2（取款）3（购买定期）4（购买基金）5（购买股票）
        let account = req.body.account;
        //need write connect db and get the operation info
        let nowBalance;
        let dingQi, fund, stock;
        if (type === 1) nowBalance += account;
        else if (type === 2) nowBalance -= account;
        else if (type === 3) {
            nowBalance -= account;
            dingQi += account;
        }else if (type === 4){
            nowBalance -= account;
            fund += account;
        }else if (type === 5){
            nowBalance -= account;
            stock += account;
        }
        //need write connect db and write into info
        let operationSuccess;
        res.json(operationSuccess);
    });

    app.post('/api/transfer', function (req, res) {
        let getUser = req.body.userId;
        let accepterId = req.body.accepterId;
        let account = req.body.account;
        let result = 0, hasAccepter;
        
        var acc_query={user_id:accepterId};
        user.count(acc_query, function(err, doc){
            if(doc===0){
                hasAccepter=false;
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
                var up={ account:accepterBalance };
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
};
