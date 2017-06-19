

var Expense = require('mongoose').model('Expense');


exports.getExpenses = function(req, res) {
  Expense.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};


exports.createExpense = function(req, res, next) {
  var expenseData = req.body;
  Expense.create(expenseData, function(err, expense) {
    if(err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(expense);
    })
};

exports.getUserExpenses= function(req,res,next){
  var userId = req.params.id;
   Expense.find({userId:userId}).exec(function(err,userExpenses){
     if(err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(userExpenses);
   });
};

exports.getExpenseWithInRange = function(req,res,next){
  var dateStart = req.params.startDate;
  var dateEnd = req.params.endDate;
  console.log("Server start Date" + dateStart);
  Expense.find({userId:req.params.id,
    created:{
      $gte: dateStart,
      $lt: dateEnd
    }
  }).exec(function(err,expense){
     if(err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(expense);
   });
};
exports.getExpense= function(req,res,next){
  var expenseId = req.params.id;
   Expense.findOne({_id:expenseId}).exec(function(err,expense){
     if(err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    console.log("from server == > " + expense.title);
    res.send(expense);
   });
};


exports.updateExpense = function(req,res,next){
  var expenseUpdates = req.body;
  Expense.findOneAndUpdate({_id:req.params.id}, req.body, function (err, expense) {
    if(err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(expense);
});   
};


exports.deleteExpense = function(req,res,next){
  Expense.remove({_id:req.params.id}, function (err, expense) {
    if(err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(expense);
});   
};