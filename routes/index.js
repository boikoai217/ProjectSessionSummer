var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Hero = require("../models/Hero.js").Hero;
var User = require("./../models/User.js").User;
var async = require('async');
var checkAuth = require("../middleware/checkAuth.js");
var index = Math.random();

var menu = [];

Hero.find(null,{_id:0,title:1,nick: 1},function(err,result){ 
    if (err) throw err; 
    menu = result ;
    console.log(menu)
});

/* GET home page. */ 
router.get('/', function(req, res, next) {
    req.session.greeting = 'Hi!!!' ;
    res.render('index', { title: 'Start Site by Artyom Boyko',  picture: 'images/homeDota.jpg', menu:menu,
        counter:req.session.counter, href:'/' });
});

//GET auth
router.get('/logreg', function(req, res, next){
    res.render('logreg',{
        menu: menu,
        error:null,
        picture: 'images/reg.jpg'
    });

});

//POST auth
router.post('/logreg', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username:username},function(err,user){
        if(err)
            return next(err)
        if(user){
            if(user.checkPassword(password)){
                req.session.user_id = user._id;
                res.redirect('/')
            } else {
                res.render('logreg',{error:"Пароль не верный"});
            }
        } else {
            var newUser = new User({username:username,password:password});
            newUser.save(function(err,user){
                if(err) return next(err);
                res.session.user_id = user._id;
                index++;
                res.redirect('/');
            })
        }
    })
});

router.get('/hero/:nick',function (req, res) {
    console.log(req.params.nick);
    res.send('Страница героя');
    Hero.findOne({"nick":req.params.nick}, function(err,result){ 
        if (err) throw err 
        var hero = result 
        res.render('hero', { 
            title: hero.title, 
            picture: hero.avatar, 
            about: hero.desc, 
            menu:menu 
        }) 
    })
});

/* Skywrath Mage. */
router.get('/mage', function(req, res, next) {
    res.render('hero', { title: 'Skywrath Mage',
        picture: 'images/Mage.jpg',
        about: 'Выходец из потомства Скайрасов при дворе Тернового Гнезда – Драгонус – с юных лет сражался на полях битвы вместе с другими героями.',
        href: '/mage' });
});
/* Spirit Breaker. */
router.get('/braker', function(req, res, next) {
    res.render('hero', { title: 'Spirit Breaker',
        picture: 'images/Braker.jpg',
        about: 'Существует мир, который в тысячи раз больше нашего. Там живут духи, существа, гордые и величественные, наделенные огромным интеллектом.',
        href: '/braker' });
});
/* Elder Titan. */
router.get('/elder', function(req, res, next) {
    res.render('hero', { title: 'Elder Titan',
        picture: 'images/Elder.jpg',
        about: 'Титаны – это существа, которые стоят у истоков происхождения всего, что есть во вселенной. Они появились, когда вселенная только начала зарождаться.',
        href: '/elder' });
});
/* Omniknight. */
router.get('/omnik', function(req, res, next) {
    res.render('hero', { title: 'Omniknight',
        picture: 'images/Omnik.jpg',
        about: 'Орден Всезнающего был посвящён служению этому богу. Рыцари сражались, ходили в крестовые походы, и одним из них был Ревнитель Громобой.',
        href: '/omnik' });
});
/* Rubik. */
router.get('/rubik', function(req, res, next) {
    res.render('hero', { title: 'Rubik',
        picture: 'images/Rubik.jpg',
        about: 'Магия. Она была всегда, извечно, как вселенная. И одним из сильнейших магов был признан Аганим, который славился своей силой и создал скипетр, носящий имя Скипетр Аганима.',
        href: '/rubik' });
});

module.exports = router;
//yulmosk@mail.ru*/