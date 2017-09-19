//http://tanmaysarkar.com/form-validation-in-nodejs/
const express = require('express'),
      app = express(),
      parser = require('body-parser'),
      //path = require('path'),
      //expressValidation = require('express-validation'),
      port = 8888, //app.set('port',(process.env.PORT || 8888));
      http = require('http'),
      db = require('../model/db'),
      pages = require('../pages');

app.locals.parentdirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
app.set('views', app.locals.parentdirname + '/views');
app.set('view engine', 'ejs');
//app.set('view engine','ejs');
//app.set('views',path.join(__dirname,'app_views'))

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.use(function(req,res,next){res.locals.blip = null; res.locals.errors = null; next();})
/*
var person ={
    fname : 'Tanmay',
    lname : 'Sarkar',
    address : {
        add1 : 'my home address',
        add2 : 'my office address'
    }
}
*/

/*
var person =[
    {   fname : 'Tanmay',    lname : 'Sarkar'    },
    {   fname : 'Harold',    lname : 'Finch'   },
    {   fname : 'John',      lname : 'Reese'   }
]
*/
//app.get('/',function(req,res){ res.json(person);});
//app.get('/',function(req,res){res.render('home_array',{topicHead : 'Scientist DB query page',anarray : person});});
//app.get('/',function(req,res){ res.render('home',{  topicHead : 'Scientist DB query page'  });});
//app.get('/', function (req, res) { res.render('form',{ title: 'Scientist DB',topicHead:'flipflop'});})
//app.post('/',function (req, res) {  pages.index(req, res);});
// ~ home_form.ejs
app.get('/',function(req,res){res.render('home_form',{topicHead : 'Scientist DB query page'});});
app.post('/scientist/add',function(req,res){  var doc = { first: req.body.fname, last: req.body.lname}; console.log(doc); res.render('home_form',{ blip: doc, topicHead: 'Scientist query'});});


//
app.listen(port, () => {  console.log('Listening on port '+port);});
