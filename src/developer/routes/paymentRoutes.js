import express from 'express';
import payment from '../controller/payment.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.post("/orderPayment/:orderID", upload,(payment.order))
.post("/verifyPayment/:orderID", upload,(payment.verify))

export default router;

 
