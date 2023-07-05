import { Order } from "../model/order";

//add this to constrain inputs and help target error messages
module.exports.validateOrder = function (order: Order): string{
    if(order.customerID <= 0){
        return "Customer ID is less or equal to 0 - customer does not exist";
    }

    return null;
}