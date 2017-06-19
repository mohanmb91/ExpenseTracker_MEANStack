var mongoose = require('mongoose');


var expenseSchema = mongoose.Schema({
    userId: String,
    title : String,
    description : String,
    amount : Number,
    created : {type : Date, default : Date.now}
  });

  var Expense = mongoose.model('Expense', expenseSchema);



function createDefaultExpenses() {
  Expense.find({}).exec(function(err,collection){
    if(collection.length == 0){
      Expense.create({userId:'12345df',title:'Test',description:'Test Description',amount:90,created:new Date()});
    } 
  });
};


exports.createDefaultExpenses = createDefaultExpenses;