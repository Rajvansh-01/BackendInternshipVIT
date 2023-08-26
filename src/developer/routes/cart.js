import express from 'express';
import Cart from '../controller/cart.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.post("/cart/:personalInfoID", upload,(Cart.createCart))
.post("/cart/:productID/:personalInfoID", upload,(Cart.addCartInformation))
.get("/cart/:personalInfoID",upload, (Cart.getAllCartInformation))
.delete("/cart/:personalInfoID", upload, (Cart.deleteAllCartInformation))

export default router;

 
