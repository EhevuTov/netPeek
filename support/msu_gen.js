zmq = require( 'zmq' );

socket = zmq.createSocket( 'req' );

socket.connect( "tcp://localhost:2000" );
