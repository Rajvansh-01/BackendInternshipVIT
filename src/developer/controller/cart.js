import { query } from "express";
import cart from "../models/cart.js";
import personalInformation from "../models/personalInfo.js";
import productAndServices from "../models/productAndServices.js";


class cartInfo {

    // create cart for an individual 
    static createCart = async (req, res) => {
        try {

            const personalInfoId = req.params.personalInfoID;

            const addCartInformation = {
                cartProducts: [{
                    productName: "",
                    serviceName: "",
                    price: "",
                    productID: "",
                    quantity: 0
                }]
            };
            new cart(addCartInformation).save().then((cartInformation) => {
                const cartID = cartInformation._id;
                personalInformation.findByIdAndUpdate(personalInfoId, { cartID: cartID }, { new: true }).then((personalInformation) => {
                    if (personalInformation) {
                        res.status(201).json({ status: "success", message: 'Cart Created Successfully', personalInfo: personalInformation, cartInfo: cartInformation });
                    } else {
                        res.status(400).json({ status: "failed", message: 'Cart not Added', data: personalInformation });
                    }
                }).catch((error) => {
                    console.log(error);
                    res.status(400).json({ status: "failed", message: 'Information not Added', data: error });
                });
            }).catch((error) => {
                res.status(400).json({ status: "failed", message: 'error', data: error });
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    // Add product to cart 
    static addCartInformation = async (req, res) => {
        try {
            const productId = req.params.productID;
            const personalInfoId = req.params.personalInfoID;

            productAndServices.findById(productId).then((product) => {
                if (product) {
                    const addCartInformation = {
                        cartProducts: [{
                            productName: product.productName,
                            serviceName: product.serviceName,
                            price: product.price,
                            productID: product._id,
                            quantity: 1
                        }]
                    };
                    personalInformation.findById(personalInfoId).then(person => {
                        const cartID = person.cartID;
                        cart.findById(cartID).then(cartFound => {
                            if (cartFound) {
                                const addCartInformations = {
                                    productName: product.productName,
                                    serviceName: product.serviceName,
                                    price: product.price,
                                    productID: product._id,
                                    quantity: 1
                                };
                                cartFound.cartProducts.push(addCartInformations);
                                cart.findByIdAndUpdate(cartID, cartFound, { new: true }).then((productInfo) => {
                                    if (productInfo) {
                                        res.status(201).json({ status: "success", message: 'Information updated successfully', data: productInfo });
                                    } else {
                                        res.status(400).json({ status: "failed", message: 'Information not updated', data: productInfo });
                                    }
                                }).catch((error) => {
                                    console.log(error);
                                    res.status(400).json({ status: "failed", message: 'Information not updated', data: error });
                                });


                            }
                        });
                    })
                } else {
                    res.status(201).json({ status: "success", message: 'product does not exist in company database!', data: product });
                }
            }).catch((error) => {
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not found', data: error });
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    //get All items of Cart
    static getAllCartInformation = async (req, res) => {
        try {

            const personalInfoId = req.params.personalInfoID;
            personalInformation.findById(personalInfoId).then(person => {
                const cartID = person.cartID;
                cart.findById(cartID).then(cartFound => {
                    if (cartFound) {
                        res.status(201).json({ status: "success", message: 'Information found', data: [{ cartInformation: cartFound }] });
                    } else {
                        res.status(400).json({ status: "failure", message: 'Information . not . found', data: cartFound });
                    }
                });
            }).catch((error) => {
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information - not - found', data: error });
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }


    //delete all products in cart
    static deleteAllCartInformation = async (req, res) => {
        try {

            const personalInfoId = req.params.personalInfoID;
            personalInformation.findById(personalInfoId).then(person => {
                const cartID = person.cartID;
                cart.findByIdAndDelete(cartID).then(cartFound => {
                    if (cartFound) {
                        res.status(201).json({ status: "success", message: 'Information found', data: [{ cartInformation: cartFound }] });
                    } else {
                        res.status(400).json({ status: "failure", message: 'Information . not . found', data: cartFound });
                    }
                });
            }).catch((error) => {
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information - not - found', data: error });
            });

            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}

export default cartInfo
