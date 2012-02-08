dojo.require( "dojo.parser");
dojo.require( "dojo.store.Memory" );
dojo.require( "dojo.store.Observable" );
dojo.require( "dojox.grid.DataGrid" );
dojo.require( "dojo.data.ItemFileWriteStore" );

var msuStore;

var layout = [
  {name: 'Index', field: 'id'},
  {name: 'Date', field: 'date', width: 10}
];

dojo.ready( function() {

  var storeTest = new dojo.data.ItemFileWriteStore({
    data: {
        identifier: "id",
        items: [
            {id: 1, date: '2010-01-01'},
            {id: 2, date: '2011-03-04'},
            {id: 3, date: '2011-03-08'},
            {id: 4, date: '2007-02-14'},
            {id: 5, date: '2008-12-26'}
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
