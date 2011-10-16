zmq = require( 'zeromq' )

publisher = zmq.createSocket( 'pub' )

console.log( "connecting..." )
publisher.bindSync( "tcp://*:5000" )

function rand( max,min ) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function msu(){ return rand( 999,100 ) +
  "-" + rand( 999,100 ) + "-" + rand( 9999,1000 ) + 
  " INIT " + rand( 99,0 ) + "." + rand( 99,0 ) + "." + rand( 99,0 ) + 
  " " + rand( 99999,0 ) }
var idInterval = setInterval( function() {publisher.send( msu() )} , 1000)

process.on('SIGINT', function() {
  console.log( "\ngracefully shutting down from  SIGINT (Crtl-C)" )
  clearInterval(idInterval)
  publisher.close()
})
