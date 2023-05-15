const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const values = ["Buy food", "Cook food", "Eat food"];

app.get("/", function(req, res){
    const day = date.getDate();

    res.render("list", {day: day, values: values});
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
});

app.post("/add", function(req, res){
    const input = req.body.todo;
    if(input != ""){
    values.push(input);
    }
    res.redirect("/");
});

app.post("/remove", function(req, res){
    const i = req.body.iteration;
    values.splice(i, 1);
    res.redirect("/");
});
app.post("/up", function(req, res){
    const i = req.body.iteration;
    const oldValue = values[i-1];
    const newValue = values[i];
    values[i-1] = newValue;
    values[i] = oldValue;
    res.redirect("/"); 
});

app.get("/about", function(req, res){
    res.render("about");
})