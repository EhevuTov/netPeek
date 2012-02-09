dojo.require( "dojo.parser");
dojo.require( "dojo.store.Memory" );
dojo.require( "dojo.store.Observable" );
dojo.require( "dojo.data.ItemFileWriteStore" );
dojo.require( "dojox.grid.DataGrid" );

var msuStore;

var layout = [
  {name: 'Index', field: 'id'},
  {name: 'Date', field: 'date', width: 10}
];

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

  var store;
  // Socket.IO connection
  var socket = io.connect( 'http://localhost' );
  socket.on( 'msu', function(data) {
    console.log(data);
    store = data;
  });

  //create the store with the data
  msuStore = new dojo.store.Memory({data: store});
  // wrap the store with Observable to make it possible to monitor
  msuStore = dojo.store.Observable(msuStore);

});
