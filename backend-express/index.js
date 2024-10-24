// import express 
const express = require('express');

// import cors 
const cors = require('cors');

// import body parser
const bodyParser = require('body-parser');

// import router
const router = require('./routes');

// init app
const app = express();

// use cors
app.use(cors());

// use body parser
app.use(bodyParser.urlencoded({ extended: false}))

// parse application json 
app.use(bodyParser.json());

// define port 
const port = 3000; 

// route 
app.get('/', (req, res) => {
    res.send("Hello world");
});

// define routes
app.use('/api', router);

// start server
app.listen(port, () => {
    console.log(`server sedang berjalan di port ${port}`);
});