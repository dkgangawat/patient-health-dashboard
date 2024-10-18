import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    medicalHistory:{
        date: String,
        diagnosis: String,
        treatment: String,
    },
    medications :{
        name: String,
        dosage: String,
        startDate: Date,
        endDate: Date,
    },
    labResults:{
        date: String,
        test: String,
        result: String,
    },
});

const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);

export default HealthRecord;
