import { Application, Request, Response } from "express";
import { Order } from "../model/order";

// Order controller class required order service class and utilises its methods 
// to render a view via axios
const orderService = require('../service/orderService');

module.exports = function (app: Application) {
    app.get('/orders', async (req: Request, res: Response) => {
        let data: Order[];
        try {
            data = await orderService.getAllOrders();

        } catch (e) {
            console.error(e);
        }

        res.render('list-orders', { orders: data })
    })

    // this is the specific url we need to go to on front end
    app.get('/orders/:id', async (req: Request,res: Response) => {
        let data: Order[];
        try {
            data = await orderService.getOrderByID(req.params.id) 
        } catch (e){
            console.error(e);
        }
            //this is name of the id which we pass to our data
            // so orders could be called anything
        res.render('view-order', { order: data})
    })

    app.get('/add-order',async (req: Request, res: Response) => {
        res.render('add-order');
    })

      //route which passes form data to a method called createOrder in the OrderService class
      app.post('/add-order',async (req: Request, res: Response) => {
        let data: Order = req.body;
        let id: number;

        try {
            id = await orderService.createOrder(data);
            res.redirect('/orders/' +id);
        } catch(e) {
            console.error(e);
            res.locals.errormessage = e.message;
            res.render('add-order', req.body);
        }
    })

    
}


