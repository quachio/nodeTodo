var bodyParser = require('body-parser');

// Dummny Data
var data = [
  {item: 'get milk'},
  {item: 'walk dog'},
  {item: 'kick some coding ass'},
];

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
    res.render('todo', { todos: data });
  });

  // Post Request
  app.post('/todo', urlencodedParser, function(req, res) {
    console.log(req.body);

    // Middleware, add item object to data array
    data.push(req.body);
    res.json(data);
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
    console.log('Delete: ' + req.url);
    // Middleware Delete data from array if post request matches the item in the array
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    })
    res.json(data);
  });
};
