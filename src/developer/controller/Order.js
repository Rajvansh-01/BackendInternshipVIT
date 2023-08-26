import cart from '../models/cart.js'
import order from '../models/order.js'
import personalInfo from '../models/personalInfo.js'

class Order{

    // make an order for products present in cart 
    static calculatePrice = async(req, res) => {

        const personalInfoID = req.params.personalInfoID;

        personalInfo.findById(personalInfoID).then(person=>{

            var final = [];
            
            var totalPrice = 0;
            var totalTax = 0;
            var totalCompulsoryTax = 200;
            var totalConditionalTax = '0.0';
            var totalQuantity = 0;
            var totalCartValue = 0;
            var cartOwnerName = "";
            var cartOwnerEmail = "";
            var cartOwnerNumber = "";

            const cartID = person.cartID;

            cart.findById(cartID).then(cartFound => {
                if (cartFound) {
                    cartFound.cartProducts.forEach(product=>{
                        
                        if(product.price !== ""){
                            totalQuantity++;
                            totalTax = 0;
                            
                            var price = parseFloat(product.price);

                            if(price>1000 && price<5000){
                                totalConditionalTax = '0.12';
                            }
                            else if(price>5000){
                                totalConditionalTax = '0.18';
                            }

                            totalPrice = price + price*parseFloat(totalConditionalTax) + totalCompulsoryTax;
                            console.log("---" + totalPrice);
                            totalTax = price*parseFloat(totalConditionalTax) + totalCompulsoryTax;
                            totalCartValue += (totalPrice);

                            let obj = {
                                productName: product.productName,
                                originalPrice: product.productName,
                                taxApplied: totalTax,
                                finalPrice: totalPrice
                            }
                
                            final.push(obj);
                            totalPrice=0; 
                            console.log(totalQuantity);
                            console.log(final);
                        }

                    })
                    

                    personalInfo.findById(personalInfoID).then((information) => {
                        cartOwnerName = information.fullName;
                        cartOwnerEmail = information.email;
                        cartOwnerNumber = information.contactNum;
            
                        const addOrder = new order({
                            OrderDetails: {
                                productsDetails: final,
                                quantity: totalQuantity,
                                CartPrice: totalCartValue
                            },
                            PersonalDetails: {
                                cartOwnerName: cartOwnerName,
                                cartOwnerEmail: cartOwnerEmail,
                                cartOwnerMobile: cartOwnerNumber
                            }
                
                        });
                        addOrder.save().then(info=>{
                            console.log("saved!!!");
                            res.status(200).send({status:"success", message:"done", data: {info}});
                        })
                        
                    }).catch((error) => {
                        console.log(error);
                        res.status(400).json({ status: "failed", message: 'Information not found', data: error });
                    });

                } else {
                    res.status(400).json({ status: "failure", message: 'Information . not . found', data: cartFound });
                }
            });
        }).catch((error) => {
            console.log(error);
            res.status(400).json({ status: "failed", message: 'Information - not - found', data: error });
        });
       
    }

    static getAllOrders = async(req, res) => {
        order.find().then(allOrders => {
            res.status(400).json({ status: "success", message: 'All Orders found', data: allOrders });
        })
    }

    
}

export default Order