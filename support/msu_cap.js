zmq = require( 'zeromq' )

console.log("Connecting...")
subscriber = zmq.createSocket( 'sub' )

subscriber.connect( "tcp://localhost:5000" )

subscriber.subscribe('Well')
subscriber.on( 'message', function (data) {
  console.log( data.toString() )
})

process.on('SIGINT', function() {
  console.log( "\ngracefully shutting down from  SIGINT (Crtl-C)" )
  subscriber.close()
})
