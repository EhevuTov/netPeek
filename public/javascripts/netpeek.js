var marketStore;

dojo.require("dojo.store.Memory");
dojo.require("dojo.store.Observable");

dojo.ready(function(){
    var data = [
        {"name": "Dow Jones", "index": 12197.88, "date": new Date()},
        {"name": "Nasdaq", "index": 2730.68, "date": new Date()},
        {"name": "S&P 500", "index": 1310.19, "date": new Date()}
    ];
//create the store with the data

marketStore = new dojo.store.Memory({data: data});
// wrap the store with Observable to make it possible to monitor:
marketStore = dojo.store.Observable(marketStore);

function viewResults(results){
        var container = dojo.byId("container");
            var rows = [];
    function addRow(market, i){
        rows.splice(i, 0, dojo.create("div", {
            innerHTML: market.name + " index: " + market.index.toFixed(2) + " at: " + market.date.toLocaleTimeString() }, container, i));
    }
    function removeRow(i){
        dojo.destroy(rows.splice(i, 1)[0]);
    }
    results.forEach(addRow);
    results.observe(function(market, removedFrom, insertedInto){
        if(removedFrom > -1){
            removeRow(removedFrom);
        }
        if(insertedInto > -1){
            addRow(market, insertedInto);
        }
    }, true);
}
var results = marketStore.query({});
viewResults(results);

});
