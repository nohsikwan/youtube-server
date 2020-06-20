import Video from "../models/Video";
import { isAuthenticated } from "../middleWare";
//본인이 업로드한 비디오를 보내주는 API/////
export const videoHomeController = async (req, res) => {
  isAuthenticated(req);
  try {
    const videos = await Video.find({ email: req.user.email });

    res.status(200).send(videos);
  } catch (error) {
    console.log("Invoked Error in videoHomeController ", error);
  }
};
//유저들이 업로드한 비디오을 보내주는 API/////
export const UsersVideoController = async (req, res) => {
  isAuthenticated(req);
  try {
    const videos = await Video.find({});

    res.status(200).send(videos);
  } catch (error) {
    console.log("Invoked Error in UsersVideoController ", error);
  }
};
///내가 업로드한 비디오중 search api///
export const myVideoSearchController = async (req, res) => {
  isAuthenticated(req);
  try {
    const {
      body: { searchItem },
    } = req;
    const searchFindItems = await Video.find({
      title: {
        $regex: searchItem,
        $options: "i",
      },
      email: req.user.email,
    });

    res.send(searchFindItems);
  } catch (error) {
    console.log("Invoked Error in videoSearchController", error);
  }
};

///모든 업로드한 비디오중 search api///
export const allVideoSearchController = async (req, res) => {
  isAuthenticated(req);
  try {
    const {
      body: { searchItem },
    } = req;
    const searchFindItems = await Video.find({
      title: {
        $regex: searchItem,
        $options: "i",
      },
    });

    res.send(searchFindItems);
  } catch (error) {
    console.log("Invoked Error in allVideoSearchController", error);
  }
};

export const videoUploadController = async (req, res) => {
  isAuthenticated(req);
  const {
    body: { text, description },
    file: { location },
  } = req;
  try {
    const newVideo = await Video.create({
      fileUrl: location,
      title: text,
      description,
      email: req.user.email,
    });
    res.send(newVideo);
  } catch (error) {
    console.log("Invoked Error in videoUploadController ", error);
  }
};

export const videoEditController = async (req, res) => {
  isAuthenticated(req);
  try {
    const {
      body: { title, description, videoId },
    } = req;

    await Video.updateOne({ _id: videoId }, { $set: { title, description } });

    res.send("Updated successfully");
  } catch (error) {
    console.log("Invoked Error in videoEditController ", error);
  }
};

export const videoDeleteController = async (req, res) => {
  isAuthenticated(req);
  try {
    const {
      body: { videoId },
    } = req;

    await Video.deleteOne({
      _id: videoId,
    });

    res.send("Deleted successfully");
  } catch (error) {
    console.log("Invoked Error in videoDeleteController ", error);
  }
};
