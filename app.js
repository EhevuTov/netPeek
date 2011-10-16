
/**
 * Module dependencies.
 */


var express = require('express' )
var zmq     = require( 'zeromq' )
var socket  = require( 'socket.io' )

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'NetStream'
  });
});

app.get('/netstream', function(req, res){
  res.render('netstream', {
    title: 'Netstream'
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// ZeroMQ MSU Subscriber
console.log( "Subscribing..." )
sub = zmq.createSocket( 'sub' )
sub.connect( "tcp://localhost:5000" )

sub.subscribe( '' )
sub.on( 'message', function (data) {
  console.log ( data.toString() )
})

// gracefully exit program
process.on( 'SIGINT', function() {
  console.log( "\ngracefully shutting down from SIGINT (Ctrl-C)" )
  sub.close()
})
