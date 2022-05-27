var express = require('express');
var todoController = require('./controller/todo-controller');
var app = express();

const port = process.env.PORT || 3000;
//set up template engine
app.set('view engine','ejs');


//static files
app.use(express.static(__dirname +'/public'));

//fire todoControllers
todoController(app);

//listen  to the port
app.listen(port);
console.log('u are listening to port ${port}');
