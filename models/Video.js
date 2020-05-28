import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Tilte is required",
  },
  description: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: "Email is required",
  },
});

const model = mongoose.model("Video", VideoSchema);
export default model;

// views: {
//   type: Number,
//   default: 0,
// },comments: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Comment",
//   },
// ]
