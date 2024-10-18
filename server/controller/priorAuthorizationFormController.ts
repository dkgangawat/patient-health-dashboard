import { Request, Response } from "express";
import Patient from "../models/patientSchema";
import PriorAuthorizationForm from "../models/priorAuthorizationFormSchema";

const addRequest = async (req: Request, res: Response) => {
  try {
    const {
      patientId,
      patientName,
      gender,
      age,
      dob,
      contactNo,
      currentAddress,
      occupation,
      photoIdProofs,
      doctorName,
      qualification,
      diagnosis,
      treatment,
      admissionDate,
      admissionTime,
      hospitalizationType,
      expectedStay,
      roomType,
      icuDays,
    } = req.body;
    const request = new PriorAuthorizationForm({
      patientId,
      patientName,
      gender,
      age,
      dob,
      contactNo,
      currentAddress,
      occupation,
      photoIdProofs,
      doctorName,
      qualification,
      diagnosis,
      treatment,
      admissionDate,
      admissionTime,
      hospitalizationType,
      expectedStay,
      roomType,
      icuDays,
    });
    await request.save();
    res.status(201).json({ request });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getRequests = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const requests = await PriorAuthorizationForm.find().select('patientName status patientId updatedAt doctorName')
      .limit(limit)
      .skip(limit * (page - 1));
      const totalPages = Math.ceil(await PriorAuthorizationForm.countDocuments() / limit);
    res.json({ requests, totalPages });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getRequest = async (req: Request, res: Response) => {
  try {
    const request = await PriorAuthorizationForm.findById(req.params.id);
    res.json({ request });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const request = await PriorAuthorizationForm.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ request });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export { 
  addRequest, 
  getRequests, 
  getRequest, 
  updateRequestStatus
 };
