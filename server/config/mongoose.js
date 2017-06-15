var mongoose = require('mongoose');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('multivision db opened');
  });

  var userSchema = mongoose.Schema({
    firstName: String,
    secondName: String,
    username: String
  });
  var User = mongoose.model('User',userSchema);

  User.find({}).exec(function(err,collection){
    if(collection.length == 0){
      User.create({firstName:'Mohan Kumar',lastName:'MBalasubramani',username:'mohan@gmail.com'});
    }
  });
};

