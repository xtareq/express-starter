const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+".png")
      }
  });


  const upload = multer({storage:storage})
  module.exports=upload