import authController from "@controllers/authController";
import validate from "@middlewares/validate";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", validate.register, authController.register);
authRouter.post("/login", validate.login, authController.login);

export default authRouter;