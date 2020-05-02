var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const models = require('./../models')
const config = require('../config/auth.config')
const Tutorial = models.tutorials;
const User = models.users
const helper = require('../helpers')
//const Op = models.Sequelize.Op;


/* GET home page. */
router.get('/', function(req, res, next) {
 // User.create({name:"Tareq",email:"tareq@site.com",password:"123456"}).then(o=>{})

 var check = helper.xstring.contains("Tareq");
 console.log(check)

 res.render(view="index",{title:"Express APi"})
  

});


router.post('/',helper.upload.single("image"), function(req, res, next) {
  // User.create({name:"Tareq",email:"tareq@site.com",password:"123456"}).then(o=>{})
  console.log(req.file.path)


  res.send(req.file.path)
 
 });


router.post('/login',function(req,res,next){
  const {email,password} = req.body;
  User.findOne({where:{email:email,password:password}}).then(d=>{
    if(!d){
      return res.status(401).end()
    }
    var token = jwt.sign({ id: d.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    res.send(token)
  })

})

router.post('/logout',function(req,res,next){
  let token = req.headers["x-access-token"];

})

module.exports = router;
