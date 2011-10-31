var msuStore;

dojo.require("dojo.store.Memory");
dojo.require("dojo.store.Observable");

dojo.ready(function(){

  var store;
  // Socket.IO connection
  var socket = io.connect('http://localhost');
  socket.on( 'msu', function(data) {
    console.log(data);
    store = data;
  });

  //create the store with the data

  msuStore = new dojo.store.Memory({data: store});
  // wrap the store with Observable to make it possible to monitor:
  msuStore = dojo.store.Observable(msuStore);

  function viewResults(results){
    var container = dojo.byId("container");
            var rows = [];
    function addRow(msu, i){
        rows.splice(i, 0, dojo.create("div", {
            innerHTML: msu.name + " index: " + msu.args }, container, i));
    }
    function removeRow(i){
        dojo.destroy(rows.splice(i, 1)[0]);
    }
    results.forEach(addRow);
    results.observe(function(msu, removedFrom, insertedInto){
        if(removedFrom > -1){
            removeRow(removedFrom);
        }
        if(insertedInto > -1){
            addRow(msu, insertedInto);
        }
    }, true);
}
var results = msuStore.query({});
viewResults(results);

});
