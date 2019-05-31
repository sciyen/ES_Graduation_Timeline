var fs = require("fs");
var name_list = fs.readFileSync("./name_list.json");

const express = require('express');
const app = express();
const port = 10418;

var json_name = JSON.parse(name_list);
var display_list = Object.keys(json_name);

app.use(express.static(__dirname + '/public'));
console.log (`listening port:${port} `);

app.listen(port);


console.log("Key list: " + display_list);
app.get("/initial", function(req, res){
    console.log("Get initial request");
    res.send(json_name);
})

app.get("/update", function(req, res){
    res.send(display_list);
})

app.get("/modify", function(req, res){
    if(req.query.remove){
        var remove_item = (req.query.remove).split(',');
        console.log("Get remove request: " + remove_item);
        remove_item.forEach((e)=>{
            var index = display_list.indexOf(e);
            if(index >= 0)
                display_list.splice(index, 1);
        })
    }
    if(req.query.add){
        var add_item = (req.query.add).split(',');
        console.log("Get add request: " + add_item);
        add_item.forEach((e)=>{
            var index = display_list.indexOf(e);
            if(index < 0)
                display_list.unshift(e);
        })
    }
    console.log(display_list);
    res.send('<script>alert("Modify success!")</script>');
})
