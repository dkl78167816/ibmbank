// set up ==========================================================
const express = require('express');  //import node.js express frame
const app = express(); //create app as express instance
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000; 

// configuration =====================================================
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static('public'));  //use resource from ./public

// routing ============================================
app.get('/', (req, res) => res.sendFile(__dirname + '/public/app.html'));

app.post('/login', function(req, res) {
  res.json(req.body);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
