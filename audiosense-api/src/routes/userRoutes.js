import express from "express";
import { createUserController, getUserDetailsController, updateUserDetailsController, updateUserPasswordController, deleteUserController, authenticationUserController } from "../controllers/userController.js"

const routes = express.Router();

routes.post("/", createUserController);
routes.get("/", getUserDetailsController);
routes.patch("/details", updateUserDetailsController);
routes.patch("/password", updateUserPasswordController);
routes.delete("/", deleteUserController);
routes.post("/login", authenticationUserController);

export default routes;