// import express from 'express';
import order from '../models/order.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// FOR PAYMENTS, KINDLY GENERATE KEY_ID AND KEY_SECRET FROM RAZORPAY 
const KEY_ID = ""
const KEY_SECRET = ""

class payment{

    // Initiate the payment 
    static order = async(req, res) => {
        try {

            const orderID = req.params.orderID;

            order.findById(orderID).then(orderFound => {
                if(orderFound){
                    console.log(orderFound.OrderDetails.CartPrice);

                    const instance = new Razorpay({
                        // key_id: process.env.KEY_ID,
                        key_id: KEY_ID,
                        // key_secret: process.env.KEY_SECRET,
                        key_secret: KEY_SECRET,
                    });
            
                    const options = {
                        amount: orderFound.OrderDetails.CartPrice * 100,
                        currency: "INR",
                        receipt: crypto.randomBytes(10).toString("hex"),
                    };
            
                    instance.orders.create(options, (error, order) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({ message: "Something Went Wrong!" });
                        }
                        res.status(200).json({ data: order });
                    });

                }else{
                    res.status(400).json({status:"failed", message:"information not found!"});
                }
            })

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!", error: error });
            console.log(error);
        }
    }

    // verify the payment 
    static verify = async(req, res) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
                req.body;
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.KEY_SECRET)
                .update(sign.toString())
                .digest("hex");
    
            if (razorpay_signature === expectedSign) {
                return res.status(200).json({ message: "Payment verified successfully" });
            } else {
                return res.status(400).json({ message: "Invalid signature sent!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    }

    
}

export default payment;
