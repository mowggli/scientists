// pages.js contains a rudimentary controller to interact with Mongoose and display output to a browser window.
// Here is where we actually do something with the connection.
// What we’re going to do is require Mongoose, bring the Team model in, create a new team and output it to the browser window.

var mongoose = require( 'mongoose' ),
    Scientist = mongoose.model('Scientist');

exports.index = function (req, res) {
  Scientist
  .find({'living':false, 'discipline': /[a-z]*physics[a-z]*|chemist/})
  //.where('discipline').equals(/[a-z]*physics[a-z]*|chemist/)
  .where('age').gt(10).lte(70)  //specification of the find query
  .select('discipline name fullName dates living -_id ')
  .limit(30)
  .sort({ 'name.last': 1 })
  //.sort({ 'dates.death': -1 })
  .exec(function(err, docs) {
     var strOutput;
     res.writeHead(200, {
       'Content-Type': 'text/plain'
     });
     if (err) {
       console.log(err);
       strOutput = 'Oh dear, we\'ve got an error';
     } else {
       strOutput = "";
       docs.forEach(
         function (doc) {
           console.log('Found ' + doc.fullName);
           strOutput = strOutput + '\n' + doc.fullName + ' ('+doc.dates.birth+'-'+doc.dates.death+') age = '+doc.age+' (alive = '+doc.living+') discpline = '+doc.discipline;
         });
     }
     res.write(strOutput);
     res.end();
   });
 };
