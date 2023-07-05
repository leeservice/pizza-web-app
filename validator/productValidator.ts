import { Product } from "../model/product";

//add this to constrain inputs and help target error messages
module.exports.validateProduct = function (product: Product): string{
    if (product.name.length > 50){
        return "Name greater than 50 characters";
    }

    if (product.description.length > 500){
        return "Product description over 500 chars"
    }

    if (product.price < 10){
        return "Price less than £10"
    }

    return null;
}