const express = require("express");
const router = express.Router();

const { getProducts, getProductById } = require("../controllers/product.js");

// get all products or search product by regex, limit, price 
router.get("/", (req, res) => {
    getProducts(req, res);
});


router.get('/:productID', (req, res) => {
    getProductById(req, res);
});

module.exports = router;