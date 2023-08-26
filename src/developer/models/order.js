import { Schema } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new Schema({

    OrderDetails: {
        productsDetails: {
            type: Array
        },
        quantity: {
            type: Number
        },
        CartPrice: {
            type: Number
        }
    },
    PersonalDetails: {
        cartOwnerName: {
            type: String
        },
        cartOwnerEmail: {
            type: String
        },
        cartOwnerMobile: {
            type: String
        }
    }

});

const orderInformation = mongoose.model('order', orderSchema);
export default orderInformation;