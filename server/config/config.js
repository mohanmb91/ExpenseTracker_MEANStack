var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');


module.exports= {
    development:{
        db: 'mongodb://localhost/expensemanager',
        rootPath : rootPath,
        port: process.env.PORT || 3030
    },
    production:{
        db: 'mongodb://mohanmb91:abcd@ds127842.mlab.com:27842/expensemanager',
        rootPath : rootPath,
        port: process.env.PORT || 80
    }
}