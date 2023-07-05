import { Product } from "../model/product";

const axios = require('axios');
const productValidator = require('../validator/productValidator');

module.exports.getProducts = async function (): Promise<Product[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/products');

        return response.data
    } catch(e) {
        throw new Error ('Could not get products');
    }
}

module.exports.getProductById = async function (id: number): Promise<Product> {
    try {
        const response = await axios.get('http://localhost:8080/api/products/' +id)
        return response.data;
    } catch (e){
        throw new Error('Could not get product by ID');
    }
}

// what is this doing?
// it's called the createProduct method which is an async method that takes a product...
// it tries to post a reponse to the product thats being created (posted) and returns the response product information
// otherwise it gives error message
module.exports.createProduct = async function (product: Product): Promise<number> {
    const errorMessage: string = productValidator.validateProduct(product);
    
    if(errorMessage){
        throw new Error(errorMessage);
    }

    try {
        const response = await axios.post('http://localhost:8080/api/products/' , product)
        return response.data;
    } catch (e){
        throw new Error('Could not create Product');
    }
}


