import mongoose from 'mongoose';
import {Schema, model} from 'mongoose';

const personalInfoSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    contactNum: {type: String, required: true},
    accountPassword: {type: String, required: true},
    cartID: {type:String}
});

const personalInfo = model('personalInfo', personalInfoSchema);
export default personalInfo
