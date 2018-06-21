var Hero = require('../models/Hero.js').Hero;

module.exports = function(req,res,next){
    res.locals.navigation = [];
    Hero.find(null,{_id:0,title:1,nick:1},
        function(err, result){
            if(err) return next(err);
            res.locals.navigation = result;
            next();
        }
    )
};