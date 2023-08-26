## ROUTES 

## for DEVELOPER
##  1) For personal Information of owner or consumer:
##          -> To create personal Information or account ---> POST REQUEST ---> '/api/test/internship/personalInfo'
##          {
##              "fullName": "Rajvansh Sen",
##              "email": "Testing@gmail.com",
##              "contactNum": "9090909090",
##              "accountPassword": "password"
##          }
##          
##          NOTE: after above data saved in DB, get its _id_ because ":personalInfoID" = _id
##          
##          To get Account information ---> GET REQUEST ---> /api/test/internship/personalInfo/:personalInfoID
##          To update Account information ---> PUT REQUEST ---> /api/test/internship/personalInfo/:personalInfoID
##          To delete Account information ---> DELETE REQUEST ---> /api/test/internship/personalInfo/:personalInfoID



##  2) For Product available in the SHOP:
##
##          -> For Products that will be available in the SHOP ---> POST REQUEST ---> '/api/test/internship/product'
##          {
##              "productName": "Watch",
##              "serviceName": "Retail",
##              "price": "2000",
##              "productID": "PYJH"
##          }
##          
##          NOTE: after above data saved in DB, get its _id_ because ":productID" = _id
##          
##          To get information of all product present ---> GET REQUEST ---> /api/test/internship/product
##          To get information of particular single product ---> GET REQUEST ---> /api/test/internship/product/:productID
##          To update single product ---> PUT REQUEST ---> /api/test/internship/product/:productID
##          To delete information of all product present ---> DELETE REQUEST ---> /api/test/internship/product
##          To delete information of particular single product ---> DELETE REQUEST ---> /api/test/internship/product/:productID



##  3) For making CART for an individual:

##          NOTE: ":personalInfoID" is "_id" of person who owns this cart -> copy any "_id" from personalInfo DB
##
##          -> To create an instance of CART for owner ---> POST REQUEST ---> '/api/test/internship/cart/:personalInfoID'
##          
##          NOTE: after above data saved in DB, get its _id_ because ":productID" = _id
##          
##          To add products to CART ---> POST REQUEST ---> /api/test/internship/cart/:productID/:personalInfoID
##          To get all products present in CART ---> GET REQUEST ---> /api/test/internship/cart/:personalInfoID
##          To delete all products present in the CART ---> DELETE REQUEST ---> /api/test/internship/cart/:personalInfoID



##  4) For making an ORDER for items present in CART:
##
##          NOTE: ":personalInfoID" is "_id" of person who owns this cart -> copy any "_id" from personalInfo DB
##
##          -> To make an ORDER for the products present in CART ---> POST REQUEST ---> '/api/test/internship/order/:personalInfoID'
##          
##          FOR ADMIN -> TO GET ALL THE ORDERS 
##          To get all orders ---> GET REQUEST ---> /api/test/internship/order



##  5) For making PAYMENT:
##
##          NOTE: ":orderID" is "_id" of orders made and saved in DB -> copy any "_id" from orders DB
##
##          -> To make payment ---> POST REQUEST ---> '/api/test/internship/orderPayment/:orderID'
##          -> To verify payment ---> POST REQUEST ---> '/api/test/internship/verifyPayment/:orderID'

