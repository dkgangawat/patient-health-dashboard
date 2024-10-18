"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var patientSchema = new mongoose_1.default.Schema({
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
    contactNo: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    currentAddress: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
});
var Patient = mongoose_1.default.model("Patient", patientSchema);
exports.default = Patient;
