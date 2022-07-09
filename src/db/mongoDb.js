const mongoose = require('mongoose')

function conectarMongoDB(url, cb) {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      if(cb != null) {
        cb(err);
      }
  });
}

module.exports = {
  conectarMongoDB
}
