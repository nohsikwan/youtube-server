import express from "express";
import {
  userEditController,
  userSingInController,
  userCreateController,
  userInfoController,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/me", userInfoController);

userRouter.post("/edit", userEditController);

userRouter.post("/signUp", userCreateController);

userRouter.post("/signIn", userSingInController);

export default userRouter;
