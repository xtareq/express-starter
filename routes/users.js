var express = require('express');
var router = express.Router();
const models = require('./../models')
const User = models.users
const { authJwt,verifySignUp } = require("../middlewares");
/* GET users listing. */
router.get('/',authJwt.verifyToken, function(req, res, next) {
  User.findAll({include:["tutorials"]}).then(data=>res.status(200).send(JSON.stringify(data)));
});
router.post('/create',verifySignUp.checkDuplicateEmail, function(req, res, next) {
  User.create({name:req.body.name,email:req.body.email,password:req.body.password}).then(o=>{
    res.send(JSON.stringify(o))
  }).catch(err=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  })
});

module.exports = router;
