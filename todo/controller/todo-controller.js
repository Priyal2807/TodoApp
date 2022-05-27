const path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //this is a piece of middleware which handles the post data for the post handler
var mongoose = require('mongoose');
require('app-module-path').addPath(path.join(__dirname, '../'));


const uri = process.env.MONGODB_URI;
mongoose.connect(uri, function (err) { 
   if (err) throw err;
});

//creating a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item:String
});

var Todo = mongoose.model('Todo',todoSchema);

module.exports = function(app){
  app.get('/todo',function(req,res){  //this will display the todo list
 
    Todo.find({},function(err,data){
      if(err) throw err;
        res.render('../todo/views/todo.ejs',{todos:data});  //this data comes from find method
    });

  });
  app.post('/todo',urlencodedParser,function(req,res){ //this will allow the user to add new items to the todo list
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });

  });
  app.delete('/todo/:item',function(req,res){ //this will allow the user to delete the todo items
    Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
      if(err) throw err;
      res.json(data);
    });

  });
};
