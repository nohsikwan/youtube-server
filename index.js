import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import "./passport";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import { authenticateJwt } from "./passport";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

/////mongoDB/////
import "./db";
import "./models/Comment";
import "./models/Video";
import "./models/User";
/////////////////
//mongoDB 가 연결이 안뜰 때 밑에 명령어 입력 =>
//$ sudo service mongod start

//mongod or mongo
//help
//use we-tube
//show collections
//db.videos.remove({})
//////////////////
app.use(morgan("dev"));
app.use(authenticateJwt);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/user", userRouter);
app.use("/video", videoRouter);

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});
