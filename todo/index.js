var express = require('express');
var todoController = require('./controller/todo-controller'); //here todoController is storing the function made in the todo-controller file and todoController is in itself a function
var app = express();

const port = process.env.PORT || 3000;
//set up template engine
app.set('view engine','ejs');


//static files
app.use(express.static('./public'));//by not speficifying the route this is applicable to any url hit

//fire todoControllers
todoController(app); //firing the function we get from module.exports by passing the app created in this file using express to allow it to use get,post,delete

//listen  to the port
app.listen(port);
console.log('u are listening to port ${port}');
