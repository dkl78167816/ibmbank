// set up ==========================================================
const express = require('express');  //import node.js express frame
const app = express(); //create app as express instance
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080; 
var path = require('path'); //a module to calculate a path

// configuration =====================================================
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static('public'));  //use resource from ./public

// routing ============================================
app.post('/api/login', function (req, res) {
  res.json(req.body);
  var query_doc = { user_id: req.body.usename, password: req.body.password };
  user.count(query_doc, function(err, doc){
      if(doc === 1){//验证成功,转到mainpage
          flag = true; 
      }else{
          flag = false     
      }   
      res.json(flag);     
  });
});

// application -------------------------------------------------------------
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/app.html')); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/src/Login.html')); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('*', function (req, res) {
  res.send(404);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
