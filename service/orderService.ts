import { Order } from "../model/order";

// axios makes http requests for us
const axios = require('axios');
const orderValidator = require('../validator/orderValidator');


module.exports.getAllOrders = async function (): Promise<Order[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/orders');

        return response.data
    } catch(e) {
        throw new Error ('Could not get orders');
    }
}

module.exports.getOrderByID = async function (id: number): Promise<Order> {
    try {
        const response = await axios.get('http://localhost:8080/api/orders/' +id)
        return response.data;
    } catch (e){
        throw new Error('Could not get order by ID');
    }
}

module.exports.createOrder = async function (order: Order): Promise<number> {
    const errorMessage: string = orderValidator.validateOrder(order);
    
    if(errorMessage){
        throw new Error(errorMessage);
    }

    try {
        const response = await axios.post('http://localhost:8080/api/orders/' , order)
        return response.data;
    } catch (e){
        throw new Error('Could not create Order');
    }
}