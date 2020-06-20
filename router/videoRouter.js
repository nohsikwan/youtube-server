import express from "express";
import {
  videoHomeController,
  videoUploadController,
  myVideoSearchController,
  videoEditController,
  videoDeleteController,
  UsersVideoController,
  allVideoSearchController,
} from "../controller/videoController";

import { uploadVideo } from "../middleWare";

const videoRouter = express.Router();
/////get//////
videoRouter.get("/", videoHomeController);

videoRouter.get("/usersVideo", UsersVideoController);
/////post/////
videoRouter.post("/edit", videoEditController);

videoRouter.post("/search", myVideoSearchController);

videoRouter.post("/allVideoSearch", allVideoSearchController);

videoRouter.post("/delete", videoDeleteController);

videoRouter.post("/upload", uploadVideo, videoUploadController);

export default videoRouter;
