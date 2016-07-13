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

// Test data
/*
var itemOne = Todo({item: 'get flower'}).save(function(err) {
  if (err) throw err;
  console.log('item save');
});
*/

// Dummny Data
/*
var data = [
  {item: 'get milk'},
  {item: 'walk dog'},
  {item: 'kick some coding ass'},
];
*/

// Setting up Middleware to run on post request
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  /**
   * Get Request for /todo, which is then map to
   * the view/todo.ejs, the render the todo.ejs view,
   * with a todos data object pass to it
   * @param  {String} '/todo'
   * @param  {Function} function(req, res)
   */
  app.get('/todo', function(req, res) {
    // Get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  // Post Request
  app.post('/todo', urlencodedParser, function(req, res) {
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });

    console.log(req.body);

    // Middleware, add item object to data array
    /*
    data.push(req.body);
    res.json(data);
    */
  });


  /**
   * Delete Request, We are using a method call filter on the data array,
   * Each time an object is filter from the data array, it pass a callback function with
   * a todo object referencing to the a filter object fom the data array. If one of the
   * todo object after inserting - matches the delete item ie req.params.item, it will be pass.
   * If it return false filter will delete it from the array
   * @return the item object
   * var data = [ {item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'},];
   */
  app.delete('/todo/:item', function(req, res) {
    // Delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
    /*
    console.log('Delete: ' + req.url);
    // Middleware Delete data from array if post request matches the item in the array
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    })
    res.json(data);
    */
  });

};
