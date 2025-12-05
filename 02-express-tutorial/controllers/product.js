const { products } = require("../data");

const getProducts = (req, res) => {

    const { regex, limit, price } = req.query;

    let filteredProducts = products;
    if( regex || limit || price){

        if(regex){
            // constructor with string pattern as first argument
            const re = new RegExp(regex, "i"); 

            filteredProducts = filteredProducts.filter((product) => {
                return re.test(product.name);
            });
        }
        
        if(price){
            filteredProducts = filteredProducts.filter((product) => {
                return product.price <= Number(price);
            })
        }

        if(limit){
            filteredProducts = filteredProducts.slice(0, Number(limit));
        }

        
    }

    return res.status(200).json(filteredProducts);
}

const getProductById = (req, res) => {
    // res.json(req.params);
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);

    if(!product){
        res.status(404).json({ message: "That product was not found." });
    } else {
        res.status(200).json(product);
    }
}



module.exports = {  getProducts, getProductById, searchProduct };    