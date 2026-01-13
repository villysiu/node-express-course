const Product = require('../models/product')

// hardcoded
const getAllProductsStatic = async (req, res) => {
    // const search = 'aaa';
    // const products = await Product.find({
    //     // featured: true, 
    //     // name: 'vase table'
    //     name: {$regex: search, $options: 'i'},
        
    // })
    // const products = await Product.find({}).sort('-name price');
    const products = await Product.find({})
        .sort(name)
        .select('name price')
        .limit(10) // show only first 10
        .skip(5) //skip first 5 records
    res.status(200).json({ products, nbHits: products.length });
    // res.status(200).json({ msg: 'products testing route'})
}

const getAllProducts = async (req, res) => {
    //mongo db operators
    const {featured, company, name, sort, fields, numericFilters} = req.query;
    const queryObject = {};

    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company;
    }
    if(name) {
        queryObject.name = name
    }
    console.log(queryObject)

    // ?numericFilters=price>=40,rating>=4
    if (numericFilters) {
        console.log(numericFilters);
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        const options = ['price', 'rating'];
        filters = filters
            .split(',')
            .forEach((item) => {
                const [field, operator, value] = item.split('-');
                if (options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) }
                }
        })
    }


    const products = await Product.find(queryObject)

    let result = Product.find(queryObject);
    // ?sort=-name,price
    // sort by name desc and price asc
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }
    // ?fields=company,rating 
    // only show these columns
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    //?limit=30&page=2
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    res.status(200).json({ products, nbHits: products.length });
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
 }