import express from 'express';
import mongoose from 'mongoose';
import keys from './config/keys.js';
import cors from "cors";
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
dotenv.config()

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
    extended: true
  }));

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(keys.database.MONGO_URI,{useNewUrlParser: true}).then(
    console.log("Connected to DB...")
)

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
    });


//import routes for developer
import personalInfo from './developer/routes/personalInfo.js';
import cart from './developer/routes/cart.js';
import order from './developer/routes/Order.js';
import productAndServices from './developer/routes/productAndServices.js';
import paymentRoutes from './developer/routes/paymentRoutes.js'

app.use('/api/test/internship', personalInfo);
app.use('/api/test/internship', cart);
app.use('/api/test/internship', productAndServices);
app.use('/api/test/internship', order);
app.use("/api/test/internship", paymentRoutes);


app.listen(keys.PORT, () => {
    console.log(`Server is running on port ${keys.PORT}`);
});

