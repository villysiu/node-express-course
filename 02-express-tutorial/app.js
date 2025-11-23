console.log('Express Tutorial')
//require the express module
const express = require('express');
const { products } = require("./data");

const app = express();

//middleware
app.use(express.static("./public"))

// get
app.get('/api/v1/test', (req, res) => {

  res.json({ message: "It worked!" });
});
 
// get products database
app.get('/api/v1/products', (req, res) => {
  res.json(products);
});

// get single product by productID or return a 404 status code and the JSON message if not found
app.get('/api/v1/products/:productID', (req, res) => {
    // res.json(req.params);
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);

    if(!product){
        res.status(404).json({ message: "That product was not found." });
    } else {
        res.json(product);
    }
})

// get single product by query string
// req.query is a hash that may contain values for “search” or “limit” or both or neither, i.e. /api/v1/query?search=al&limit=5
app.get('/api/v1/query', (req, res) => {
    // const { search, limit, price } = req.query;

    // if(!search)
    //     res.status(200).json({ message: "No search word." });

    
    // let filteredProducts = products.filter((product) => {
    //     return product.name.startsWith(search);
    // });

    const { regex, limit, price } = req.query;

    if(!regex)
        res.status(200).json({ message: "No search word." });

    // constructor with string pattern as first argument
    const re = new RegExp(regex, "i"); 

    let filteredProducts = products.filter((product) => {
        return re.test(product.name);
    });
     
    
    if(price){
        filteredProducts = filteredProducts.filter((product) => {
            return product.price <= Number(price);
        })
    }

    if(limit){
        filteredProducts = filteredProducts.slice(0, Number(limit));
    }



    // if(sortedProducts.length < 1){
    //     // res.status(200).json({ success: true, data: [] });
    //     return res.status(200).json({ success: true, data: [] });
    // }
    return res.status(200).json(filteredProducts);
})

// all other routes - 404
app.all('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><p>Sorry, that page does not exist.</p>');
});


app.listen(3000);
console.log("The server is listening on port 3000.");