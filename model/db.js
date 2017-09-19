// model/db.js is where we hold the database connection information and event listeners/handlers.
// We’ll also import our schemas & models into here so that the application has access to them.

// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;

// Build the connection string
//var dbURI = 'mongodb://localhost:27017/test'; //'mongodb://localhost/test'
var dbURI = 'mongodb://mowggli:troWS9ben@ds137464.mlab.com:37464/base_de_donnees_test'
// Create the database connection
mongoose.connect(dbURI, { useMongoClient: true });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('\nMongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('\nMongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('\nMongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection (on CTRL C)
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS // For example
require('./../model/scientist');
