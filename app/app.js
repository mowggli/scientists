//http://tanmaysarkar.com/form-validation-in-nodejs/
const express = require('express'),
      app = express(),
      parser = require('body-parser'),
      //path = require('path'),
      //expressValidation = require('express-validation'),
      //assert = require('assert'),
      port = 8888, //app.set('port',(process.env.PORT || 8888));
      http = require('http'),
      db = require('../model/db'),
      pages = require('../pages');
/******************************************************************************/
const mongoose = require( 'mongoose' ),
      Scientist = mongoose.model('Scientist');
/******************************************************************************/
app.locals.parentdirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
app.set('views', app.locals.parentdirname + '/views');
app.set('view engine', 'ejs');
//app.set('view engine','ejs');
//app.set('views',path.join(__dirname,'app_views'))

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.use(function(req,res,next){res.locals.blip = null; res.locals.errors = null; next();})

app.use( express.static( __dirname + "static" ) );
/******************************************************************************/
app.get('/',function(req,res){res.render('home',{topicHead : 'Scientist DB query page'});});
app.post('/scientist/query_result',function(req,res){
  var query = {};
  for (var property in req.body) {
    if (req.body[property]!='undefined' && req.body[property]!='' ) {
      if (property =='age' ||property =='name.last' ||property =='name.first' ||property =='discipline'||property =='living') {
        query[property] = req.body[property];
      }
      if (property =='discipline') {
        query[property] = req.body[property];
      }
    }
  }
  console.log('query is : '+ JSON.stringify(query));
/******************************************************************************/
  Scientist
  .find(query)
  //.where('discipline').equals(/[a-z]*physics[a-z]*|chemist/)
  //.where('age').gt(10).lte(70)  //specification of the find query
  //.select('discipline name fullName dates living -_id ')
  .limit(30)
  .sort({ 'name.last': 1 })
  //.sort({ 'dates.death': -1 })
  .exec(function(err, docs) {
     //var strOutput;
     //res.writeHead(200, {       'Content-Type': 'text/plain'     });
     if (err) {
       console.log(err);
       //strOutput = 'Oh dear, we\'ve got an error';
     } else {
       //strOutput = "";
       res.render('matches',{ blip: docs, topicHead: 'query results'});
/*
       docs.forEach(
         function (doc) {
           console.log('Found ' + doc.fullName);
           //strOutput = strOutput + '\n' + doc.fullName + ' ('+doc.dates.birth+'-'+doc.dates.death+') age = '+doc.age+' (alive = '+doc.living+') discpline = '+doc.discipline;
           res.render('home',{ blip: doc, topicHead: 'Scientist query results'});
         });
*/
     }
     //res.write(strOutput);
     //res.end();
   });
/******************************************************************************/
});

//
app.listen(port, () => {  console.log('Listening on port '+port);});
