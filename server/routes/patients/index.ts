import {Router} from "express";
import { addHealthRecord, addPatient, getHealthRecord, getPatient, getPatients } from "../../controller/patientsController";

const patientsRouter = Router();

patientsRouter.post("/add-patient", addPatient)
patientsRouter.get("/get-patients", getPatients)
patientsRouter.get("/get-patient/:id", getPatient)
patientsRouter.post("/add-health-record", addHealthRecord)
patientsRouter.get("/get-health-record/:id", getHealthRecord)

export default patientsRouter;