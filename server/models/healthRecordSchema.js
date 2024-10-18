"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var healthRecordSchema = new mongoose_1.default.Schema({
    patientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    medicalHistory: {
        date: String,
        diagnosis: String,
        treatment: String,
    },
    medications: {
        name: String,
        dosage: String,
        startDate: Date,
        endDate: Date,
    },
    labResults: {
        date: String,
        test: String,
        result: String,
    },
});
var HealthRecord = mongoose_1.default.model("HealthRecord", healthRecordSchema);
exports.default = HealthRecord;
