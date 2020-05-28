import express from "express";
import {
  videoHomeController,
  videoUploadController,
  videoSearchController,
  videoEditController,
  videoDeleteController,
} from "../controller/videoController";

import { uploadVideo } from "../middleWare";

const videoRouter = express.Router();
/////get//////
videoRouter.get("/", videoHomeController);

videoRouter.get("/search", videoSearchController);

/////post/////
videoRouter.post("/edit", videoEditController);

videoRouter.post("/delete", videoDeleteController);

videoRouter.post("/upload", uploadVideo, videoUploadController);

export default videoRouter;
