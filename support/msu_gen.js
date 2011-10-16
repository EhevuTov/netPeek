zmq = require( 'zeromq' )

publisher = zmq.createSocket( 'pub' )

console.log( "connecting..." )
publisher.bindSync( "tcp://*:5000" )

var idInterval = setInterval( function() {publisher.send( "Well hello thar!" )} , 1000)

process.on('SIGINT', function() {
  console.log( "\ngracefully shutting down from  SIGINT (Crtl-C)" )
  clearInterval(idInterval)
  publisher.close()
})
