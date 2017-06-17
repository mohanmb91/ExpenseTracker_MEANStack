var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

  var expenseSchema = mongoose.Schema({
    name : String,
    description : String,
    amount : Number,
    created : {type : Date, default : Date.now}
  });
  var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: {type:String, required:'{PATH} is required!'},
    username: {
    type: String,
    required: '{PATH} is required!',
    unique:true
    },
    salt: {type:String, required:'{PATH} is required!'},
    hashed_pwd: {type:String, required:'{PATH} is required!'},
    roles: [String],
    expense_list: [expenseSchema]
  });
  userSchema.methods = {
    authenticate: function(passwordToMatch){
      return encrypt.hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
      return this.roles.indexOf(role) > -1;
    }
  }
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function(err,collection){
    if(collection.length == 0){
      var salt,hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt,'abcd');
      User.create({firstName:'Mohan Kumar',lastName:'MBalasubramani',username:'mohan@gmail.com',salt:salt,hashed_pwd:hash,roles:['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt,'abcd');
      User.create({firstName:'Febi',lastName:'kennedy',username:'febi@gmail.com',salt:salt,hashed_pwd:hash,roles:['']});
    } 
  });
};

exports.createDefaultUsers = createDefaultUsers;