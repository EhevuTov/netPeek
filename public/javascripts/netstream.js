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

dojo.query("#timed-notifications").onclick(function(){
    setInterval(function(){
        var market = data[Math.floor(Math.random() * 3)];
        market.index += Math.random() - 0.5;
        market.date = new Date();
        marketStore.notify(market, market.name);
    }, 1000); // every second
    dojo.query("#dow-jones").onclick(function(){
        var dowJones = marketStore.get("Dow Jones");
        dowJones.index = parseFloat(prompt("New index for Dow Jones")) || 0;
        dowJones.date = new Date();
        marketStore.put(dowJones);
    });
});
});
