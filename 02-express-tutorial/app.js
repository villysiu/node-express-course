console.log('Express Tutorial')
//require the express module
const express = require('express');
const cookieParser = require('cookie-parser');

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

const auth = (req, res, next) => {
  const {name} = req.cookies;
  if(name){
    req.user = name;
    return next();
  }
  else {
    return res.status(401).json({ message: "Unauthorized access." });
  }
}

const app = express();   

app.use(cookieParser());
app.use(logger);

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



app.post("/logon", (req, res) => {
  const {name} = req.body;
  if(name){
    res.cookie("name", name);
    res.status(201).json({ message: `Hello ${name}!`});
  }
  else {
    res.status(400).json({ message: "name not present"})
  }
 })
app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ message: " user logged off"});


 })

 // app.use(auth)
app.get("/test", auth, (req, res) =>{

  res.status(200).json({ message: `Welcome ${req.user}!`});
 })
 // all other routes - 404
app.all('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><p>Sorry, that page does not exist.</p>');
});






app.listen(3000);
console.log("The server is listening on port 3000.");