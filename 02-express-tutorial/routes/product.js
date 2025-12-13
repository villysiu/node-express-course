const express = require("express");
const router = express.Router();

const { getProducts, getProductById } = require("../controllers/product.js");

// get all products or search product by regex, limit, price 
router.get("/", getProducts);


router.get('/:productID', getProductById);

module.exports = router;