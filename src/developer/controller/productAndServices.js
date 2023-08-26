import productInformation from "../models/productAndServices.js";

//ADMIN -> Add Product Info
class productAndServices{

    // add a product to shop
    static addProductInformation = async (req, res) => {

        try {        
            const addProInformation = {
                productName: req.body.productName,
                serviceName: req.body.serviceName,
                price: req.body.price,
                productID: req.body.productID
            };
            new productInformation(addProInformation).save().then((productInformation) => {
                
                if (productInformation) {
                    res.status(201).json({ status: "success", message: 'Information added successfully', data: productInformation });
                } else {
                    res.status(400).json({ status: "failed", message: 'Information not Added', data: productInformation });
                }    

            }).catch((error) => {
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not Added', data: error });
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Update the product details 
    static updatedProductInformation = async (req, res) => {

        try {
            const productInformationId = req.params.productID;
            
            const updatedInformation = {
                productName: req.body.productName,
                serviceName: req.body.serviceName,
                price: req.body.price,
                productID: req.body.productID
            }
                
            productInformation.findByIdAndUpdate(productInformationId, updatedInformation, { new: true }).then((productInfo) => {
                if (productInfo) {
                    res.status(201).json({ status: "success", message: 'Information updated successfully', data: productInfo });
                } else {
                    res.status(400).json({ status: "failed", message: 'Information not updated', data: productInfo });
                }
            }).catch((error) => {
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not updated', data: error });
            });
                
        } catch (error) {
            console.log(error);
            res.status(400).json({ status: "failed", message: 'Information not updated', data: error });
        }

    }

    //get product info of a single chosen product
    static getSingleProductInformation = async (req, res) => {
        try {
            const productId = req.params.productID;

            productInformation.findById(productId).then((product)=>{
                if(product){
                    res.status(201).json({ status: "success", message: 'Information found', data: [{productInformation:product}] });
                }else{
                    res.status(201).json({ status: "success", message: 'Information found', data: product });
                }
            }).catch((error)=>{
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not found', data: error });
            });
                
        }catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    // get info of all the products present
    static getAllProductInformation = async (req, res) => {
        try {
            productInformation.find().then((product)=>{
                if(product){
                    res.status(201).json({ status: "success", message: 'Information found', data: [{productInformation:product}] });
                }else{
                    res.status(201).json({ status: "success", message: 'Information found', data: product });
                }
            }).catch((error)=>{
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not found', data: error });
            });
                
        }catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    // delete Products and services by ADMIN 
    static deleteProductInformation = async (req, res) => {
        try {
            const productId = req.params.productID;

            productInformation.findByIdAndDelete(productId).then((information)=>{
                if(information){
                    res.status(201).json({ status: "success", message: 'Information deleted successfully', data: information });
                }
                else{
                    res.status(400).json({ status: "failed", message: 'Information not deleted', data: information });
                }
            }).catch((error)=>{
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not deleted', data: error });
            });
        }catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    // delete all products present at shop
    static deleteAllProductInformation = async (req, res) => {
        try {
            productInformation.deleteMany().then((information)=>{
                if(information){
                    res.status(201).json({ status: "success", message: 'Information deleted successfully', data: information });
                }
                else{
                    res.status(400).json({ status: "failed", message: 'Information not deleted', data: information });
                }
            }).catch((error)=>{
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not deleted', data: error });
            });
        }catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}

export default productAndServices
