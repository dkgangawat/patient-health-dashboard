import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    contactNo:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    currentAddress:{
        type: String,
        required: true,
    },
    occupation:{
        type: String,
        required: true,
    },
    
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
