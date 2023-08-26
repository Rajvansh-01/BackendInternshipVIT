import express from 'express';
import Order from '../controller/Order.js';
import upload from '../middleware/upload.js';
const router = express.Router();


router.post("/order/:personalInfoID",upload, (Order.calculatePrice))
.get("/order",upload, (Order.getAllOrders)) //For ADMIN

export default router;

 
