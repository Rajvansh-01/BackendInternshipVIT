import { Schema } from "mongoose";
import mongoose from "mongoose";

const cartInformationSchema = new Schema({
    cartProducts: [{
        productName:{
            type: String,
        },
        serviceName:{
            type: String,
        },
        price:{
            type: String,
        },
        productID: {
            type: String
        },
        quantity: {
            type: Number
        }        
    }]
});

const cartInformation = mongoose.model('cart', cartInformationSchema);
export default cartInformation;