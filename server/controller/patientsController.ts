import { Request, Response } from "express";
import Patient from "../models/patientSchema";
import HealthRecord from "../models/healthRecordSchema";

const addPatient = async (req: Request, res: Response) => {
    try {
        const {name, age, condition} = req.body;
        const patient = new Patient({
            name,
            age,
            condition,
        });
        await patient.save();
        res.status(201).json({patient});
    } catch (error) {
        if (error instanceof Error){ res.status(500).json({message: error.message})}
        else{
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

const getPatients = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const patients = await Patient.find().skip(skip).limit(limit);
        const totalPages = Math.ceil(await Patient.countDocuments() / limit);
        res.status(200).json({patients, totalPages});
    } catch (error) {
        if (error instanceof Error){ res.status(500).json({message: error.message})}
        else{
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

const getPatient = async (req: Request, res: Response) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({message: "Patient not found"});
        res.status(200).json({patient});
    } catch (error) {
        if (error instanceof Error){ res.status(500).json({message: error.message})}
        else{
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

// add patient health care recorde 
const addHealthRecord = async (req: Request, res: Response) => {
    try {
        const {patientId, date, medicalHistory, medications, labResults} = req.body;
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({message: "Patient not found"});
        const healthRecord = new HealthRecord({
            patientId,
            date,
            medicalHistory,
            medications,
            labResults,
        });
        await healthRecord.save();
        res.status(201).json({healthRecord});
    } catch (error) {
        if (error instanceof Error){ res.status(500).json({message: error.message})}
        else{
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

// get patient health care recorde
const getHealthRecord = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.id;
        const healthRecord = await HealthRecord.find({patientId}).populate("patientId");
        res.status(200).json({healthRecord});
    } catch (error) {
        if (error instanceof Error){ res.status(500).json({message: error.message})}
        else{
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

export {addPatient, getPatients, getPatient,addHealthRecord, getHealthRecord};



