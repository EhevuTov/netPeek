dojo.require( "dojo.parser");
dojo.require( "dojo.store.Memory" );
dojo.require( "dojo.store.Observable" );
dojo.require( "dojo.data.ItemFileWriteStore" );
dojo.require( "dijit.layout.BorderContainer" );
dojo.require( "dijit.layout.TabContainer" );
dojo.require( "dijit.layout.ContentPane" );
dojo.require( "dojox.grid.DataGrid" );

var msuStore;

dojo.ready( function() {
    // init needed to begin program after successful loading
    // run loading icon for start of program
    var n = dojo.byId("preLoader");
    dojo.fadeOut({
node:n,
duration:720,
onEnd:function(){
// dojo._destroyElement(n);
dojo.style(n,"display","none");
}
}).play();

    var storeTest = new dojo.data.ItemFileWriteStore({
data: {
identifier: "id",
items: [
{'id': 1, phone:'324-432-1235', function:'init', point:'23.45.43', length: 45435},
{'id': 2, phone:'324-432-1254', function:'init', point:'23.45.43', length: 44335},
{'id': 3, phone:'324-432-1298', function:'init', point:'23.45.43', length: 67345},
{'id': 4, phone:'324-432-1212', function:'init', point:'23.45.43', length: 98342},
{'id': 5, phone:'324-432-1234', function:'init', point:'23.45.43', length: 34324},
]
}
});
dijit.byId('grid').setStore(storeTest);

//create the store with the data
msuStore = new dojo.store.Memory({data: store});
// wrap the store with Observable to make it possible to monitor
msuStore = dojo.store.Observable(msuStore);

var store;
// Socket.IO connection
var socket = io.connect( 'http://localhost' );
var i = 6;

  function listen_msu (data) {
    console.log(data);
    store = data;
    storeTest.newItem({'id': i, phone:'324-432-1234', function:'init', point:'23.45.43', length: 34324}) 
    i++;
  };

  function socket_start() {
    console.log( "clicked" )
    socket.on( 'msu', listen_msu ) //wrong way
    socket.emit( 'start' ) //right way
  }
  function socket_stop() {
    console.log( "clicked" )
    socket.removeListener( 'msu', listen_msu )
    socket.emit( 'stop' )
  }
  dojo.connect( dojo.byId( 'startPeek' ), 'click', socket_start)
  dojo.connect( dojo.byId( 'stopPeek' ), 'click', socket_stop)

});
