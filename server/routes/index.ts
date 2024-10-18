import { Router } from "express";
import patientsRouter from "./patients";
import priorAuthorizationFormRouter from "./prior-authorization-form";
import authRouter from "./auth";

const appRouter = Router()

appRouter.use("/patients", patientsRouter)
appRouter.use('/prior-authorization-form', priorAuthorizationFormRouter)
appRouter.use('/auth', authRouter)

export default appRouter
