import { Application, Request, Response } from "express"
import { Product } from "../model/product";

// Product controller class required product service class and utilises its methods 
// to render a view via axios
const productService = require('../service/productService');


module.exports = function (app: Application) {
    app.get('/products', async (req: Request, res: Response) => {
        let data: Product[]
        
        try {
            data = await productService.getProducts();

        } catch (e) {
            console.error(e);
        }
        res.render('list-products', { products: data });
    })

    app.get('/products/:id', async (req: Request,res: Response) => {
        let data: Product[]
        try {
            data = await productService.getProductById(req.params.id)

        } catch (e){
            console.error(e);
        }
        res.render('view-product', {product: data});
    })

    // route which renders the add-product.html view
    app.get('/add-product',async (req:Request, res: Response) => {
        res.render('add-product');
    })

    //route which passes form data to a method called createProduct in the ProductService class
    app.post('/add-product',async (req: Request, res: Response) => {
        let data: Product = req.body;
        let id: number;

        try {
            id = await productService.createProduct(data);
            res.redirect('/products/' +id);
        } catch(e) {
            console.error(e);

            //display an error message when the create fails:
            res.locals.errormessage = e.message;

            res.render('add-product', req.body);
        }
    })

    

}



