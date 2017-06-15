var mongoose = require("mongoose");

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,'conntection error ... '));
    db.once('open',function callback(){
        console.log("expense manager DB open");
    });

    var userSchema =  mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });
    var User = mongoose.model('User',userSchema);

    User.find({}).exec(function(err,collection){
        if(collection.length == 0){
            User.create({firstName: 'mohankumar',lastName: 'MBalasubramani',username: 'mohan@gmail.com'});
        }
    });

    
}