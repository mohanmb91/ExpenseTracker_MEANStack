var mongoose = require('mongoose'),
  crypto = require('crypto');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('multivision db opened');
  });

  var expenseSchema = mongoose.Schema({
    name : String,
    description : String,
    amount : Number,
    created : {type : Date, default : Date.now}
  });
  var userSchema = mongoose.Schema({
    firstName: String,
    secondName: String,
    username: String,
    salt: String, 
    hashed_pwd: String,
    roles: [String],
    expense_list: [expenseSchema]
  });
  userSchema.methods = {
    authenticate: function(passwordToMatch){
      return hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
    }
  }

  var User = mongoose.model('User',userSchema); 

  User.find({}).exec(function(err,collection){
    if(collection.length == 0){
      var salt,hash;
      salt = createSalt();
      hash = hashPwd(salt,'abcd');
      User.create({firstName:'Mohan Kumar',lastName:'MBalasubramani',username:'mohan@gmail.com',salt:salt,hashed_pwd:hash,roles:['admin']});
      User.create({firstName:'Febi',lastName:'kennedy',username:'febi@gmail.com',salt:salt,hashed_pwd:hash,roles:['']});
    } 
  });
  function createSalt(){
    return crypto.randomBytes(128).toString('base64');
  }

  function hashPwd(salt, pwd){
  var hmac = crypto.createHmac('sha1', salt);
  hmac.setEncoding('hex');
  hmac.write(pwd);
  hmac.end();
  return hmac.read();
}
};

