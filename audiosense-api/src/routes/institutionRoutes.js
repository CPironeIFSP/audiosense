import express from "express";
import { createInstitutionController, getInstitutionDetailsController, updateInstitutionDetailsController, updateInstitutionPasswordController, deleteInstitutionController, authenticationInstitutionController, getAllInstitutionController } from "../controllers/institutionController.js"

const routes = express.Router();

routes.post("/", createInstitutionController);
routes.get("/get-details", getInstitutionDetailsController);
routes.patch("/details", updateInstitutionDetailsController);
routes.patch("/password", updateInstitutionPasswordController);
routes.delete("/", deleteInstitutionController);
routes.post("/login", authenticationInstitutionController);
routes.get("/", getAllInstitutionController)

export default routes;