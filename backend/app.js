var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require("dotenv");


dotenv.config('./env');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/orders');


//adminRouter 必须放在后面
var adminRouter = require('./routes/admin');

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders',orderRouter);


app.use('/admin',adminRouter);




module.exports = app;
