//Packages
const path = require('path');
const fs = require('fs');
const http = require('http');

//Sensitive Data
const senstive = require('./senstive');

const express = require('express');

//Third Party Packages
const bodyParser = require('body-parser');


//Database Packages
const mongoose = require('mongoose');
const mongodb = require('mongodb');

//Routes
const taskListRouter = require('./routes/taskList');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

//Controllers
const errorController = require('./controllers/error');

//Setups
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//Contollers Setup

app.use('/', (req, res, next) => {
    console.log('Body: ', req.body)
    console.log('Params: ', req.params)
    console.log('Query: ', req.query);
    next();
})
app.use('/task', taskRouter);

app.use('/list', taskListRouter); //Tested

app.use('/user', userRouter); //Tested

app.use(errorController.error);




//Database Setup
mongoose
    .connect(senstive.testDatabaseUrl)
    .then(result => {
        console.log('connected');
        app.listen(4000);
    })
    .catch(err => {
        console.log(err);
    });
//why am i getting a metpy request body in this code?