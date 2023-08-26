import { Schema } from "mongoose";
import mongoose from "mongoose";

const productAndServices = new Schema({
    productName:{
        type: String,
    },
    serviceName:{
        type: String,
    },
    price:{
        type: String,
    }

});

const productAndService = mongoose.model('proAndSer', productAndServices);
export default productAndService;