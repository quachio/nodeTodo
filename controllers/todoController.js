var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://test:test@ds037617.mlab.com:37617/todo');

// Create a schema - this is a blueprint for our database
var todoSchema = new mongoose.Schema({
  item: String
});

// A todo model base on the Schema
var Todo = mongoose.model('Todo', todoSchema);

// Setting up Middleware to run on post request
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  // Get Request
  app.get('/todo', function(req, res) {
    // Middleware: Get data from mongodb and pass it to view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  // Post Request
  app.post('/todo', urlencodedParser, function(req, res) {
    // Middleware: get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  // Delete Request
  app.delete('/todo/:item', function(req, res) {
    // Delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, ' ')})
        .remove(function(err, data){
          if (err) throw err;
          res.json(data);
        });
    });
};
