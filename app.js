/*!
 * nodeTodo
 * Copyright(c) 2016 Hun g Quach
 * MIT Licensed
 */
var express                = require('express');
var address                = require('os').networkInterfaces();
var todoController         = require('./controllers/todoController');
var setupExpressController = require('./controllers/setupExpressController');
var startServerController  = require('./controllers/startServerController');

var app = express();

/*
    Fire Controllers
 */
setupExpressController(express, app);
startServerController(app);
todoController(app);
