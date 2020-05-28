import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

/////////////////AWS S3 UPLOAD//////////////
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2",
});
const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "kwantube",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
export const uploadVideo = upload.single("File");

//////////////////////////////////////////////
export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error("로그인이 필요합니다");
  }
  return;
};
