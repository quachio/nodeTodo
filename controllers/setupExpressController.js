module.exports = function(express, app) {

  // Setting up Template Enginer using EJS
  /*
    Specifying the tempate engine to be use in express, Here we use
    EJS
   */
  app.set('view engine', 'ejs');

  /*
     Whenever a request is made for ie ,
     localhost:3000/assets/styles.css
     it is map to the public folder.
     Example of Middleware

  */
  app.use(express.static('./public'));
};
