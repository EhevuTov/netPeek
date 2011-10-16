zmq = require( 'zeromq' )

//create the subscriber socket with keyword 'sub'
console.log("Connecting...")
subscriber = zmq.createSocket( 'sub' )

//connect the subscriber to the publisher
subscriber.connect( "tcp://localhost:5000" )

//subscribe to a certain text that matches like a wildcard
subscriber.subscribe('')
subscriber.on( 'message', function (data) {
  console.log( data.toString() )
})

//gracefully exit the program
process.on('SIGINT', function() {
  console.log( "\ngracefully shutting down from  SIGINT (Crtl-C)" )
  subscriber.close()
})
