var async = require("async");
var mongoose = require('mongoose') ;
mongoose.connect('mongodb://localhost/fivepage') ;
var Hero = require("./models/Hero.js").Hero;
var data = require("./data.js").data;


async.series([ 
    open, 
    dropDB, 
    createHeroes 
], function(err){ 
    if(err) throw err 
    console.log("Ok") 
    mongoose.connection.close() 
})

function open(callback){ 
    mongoose.connection.on("open",callback) 
} 
function dropDB(callback){ 
    var db = mongoose.connection.db 
    db.dropDatabase(callback) 
} 
function createHeroes(callback){ 
    async.each(data,function(heroData,callback){ 
        var hero = new Hero(heroData) 
        hero.save(callback) 
    }, callback) 


}