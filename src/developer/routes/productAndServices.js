import express from 'express';
import proAndServices from '../controller/productAndServices.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.post("/product", upload,(proAndServices.addProductInformation))
.put("/product/:productID", upload, (proAndServices.updatedProductInformation))
.get("/product/:productID",upload, (proAndServices.getSingleProductInformation))
.get("/product",upload, (proAndServices.getAllProductInformation))
.delete("/product/:productID", upload, (proAndServices.deleteProductInformation))
.delete("/product", upload, (proAndServices.deleteAllProductInformation))

export default router;

