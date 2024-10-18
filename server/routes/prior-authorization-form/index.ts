import { Router } from "express";
import { addRequest, getRequests, getRequest, updateRequestStatus } from "../../controller/priorAuthorizationFormController";

const priorAuthorizationFormRouter = Router();

priorAuthorizationFormRouter.post("/add-request", addRequest);
priorAuthorizationFormRouter.get("/get-requests", getRequests);
priorAuthorizationFormRouter.get("/get-request/:id", getRequest);
priorAuthorizationFormRouter.put("/update-request-status/:id", updateRequestStatus);

export default priorAuthorizationFormRouter;
