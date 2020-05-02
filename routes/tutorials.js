var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const models = require('../models')
const { authJwt } = require("../middlewares");
const Tutorial = models.tutorials
/* GET users listing. */

router.get('/', function(req, res, next) {
  Tutorial.findAll({include:["user"]}).then(data=>res.status(200).json(data));
});


router.post('/create', authJwt.verifyToken, function(req, res, next) {
  var newTutorial = {
    title:req.body.title,
    description:req.body.description,
    published:req.body.published,
    userId:req.body.userId
  }
 
  Tutorial.create(newTutorial).then(o=>{
    res.status(200).send(JSON.stringify(o))
  }).catch(err=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  })
});

router.put('/update/:id', authJwt.verifyToken, function(req, res, next) {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
});

router.delete('/delete/:id', authJwt.verifyToken, function(req, res, next) {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted  successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
});

module.exports = router;
