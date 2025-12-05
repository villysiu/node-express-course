console.log('Express Tutorial')
//require the express module
const express = require('express');

const peopleRouter = require("./routes/people");
const productRouter = require("./routes/product")

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const origUrl = req.originalUrl;
    const time = new Date().getTime();
    console.log(method, url, origUrl, time);
    next();
}
const app = express();   


//middleware
// app.use(express.static("./public"))
app.use(express.static("./methods-public"));


// middleware to parse request body into a Javascript object. 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/products", productRouter);

app.get('/api/v1/test', (req, res) => {

  res.json({ message: "It worked!" });
});

// logger middleware strip the prefix, instead of rturning /api/v1/test1, it returns /.
// use req.originalUrl to get /api/v1/test
// when empty array, req.url returns full url again

//GET /api/v1/test16 /api/v1/test16 1764218554791
app.use(logger);

// GET / /api/v1/test16 1764218615191
// app.use(["/api/v1/test16"], logger);

 

// all other routes - 404
app.all('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><p>Sorry, that page does not exist.</p>');
});


app.listen(3000);
console.log("The server is listening on port 3000.");