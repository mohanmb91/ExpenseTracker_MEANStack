

var Expense = require('mongoose').model('Expense');

exports.createExpense = function(req, res, next) {
  var expenseData = req.body;
  console.log(expenseData.userId);
  Expense.create(expenseData, function(err, expense) {
    if(err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(expense);
    })
};

exports.getUserExpenses= function(req,res,next){
  var userId = req.params.userId;
   Expense.find({userId:userId}).exec(function(err,userExpenses){
    res.send(userExpenses);
   });
};