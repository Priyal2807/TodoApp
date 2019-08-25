//var data = [{item:'get milk'},{item:'walk dog'},{item : 'kick some coding '}]
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //this is a piece of middleware which handles the post data for the post handler
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo', function (err) { // if the db does not exist it will create the database

   if (err) throw err;

   console.log('Successfully connected');

});

//creating a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item:String
});

var Todo = mongoose.model('Todo',todoSchema);

module.exports = function(app){
  app.get('/todo',function(req,res){  //this will display the todo list
    //get data from mongodb and pass it to the view

    Todo.find({},function(err,data){
      if(err) throw err;
        res.render('todo',{todos:data});  //this data comes from find method
    });//retreives all items

  });
  app.post('/todo',urlencodedParser,function(req,res){ //this will allow the user to add new items to the todo list
    //get data from the view and add it to the database
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      console.log(Todo.findOne({item:req.body.item}));


      res.json(data);
    });

  });
  app.delete('/todo/:item',function(req,res){ //this will allow the user to delete the todo items
    //delete the requested item from mongodb

    Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
      if(err) throw err;
      res.json(data);
    });

  });
};
