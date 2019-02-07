const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const config = require('./config/dev');
const userRoutes = require('./Routes/users');
const dataRoutes = require('./Routes/data');
const dataTwoRoutes = require('./Routes/data2');
const imageUploadRoutes = require('./Routes/image-upload');


mongoose.connect('mongodb://Mongoose:Mongoose1@ds231658.mlab.com:31658/leo-ng-dev').then(()=>{
});

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.use('/api/data1', dataRoutes);

app.use('/api/data2', dataTwoRoutes);

app.use('/api/image-upload', imageUploadRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
  console.log("Server is running");
});