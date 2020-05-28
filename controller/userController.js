import User from "../models/User";
import crypto from "crypto";
import { isAuthenticated } from "../middleWare";
import { generateToken } from "../utils";

export const userSingInController = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  //password 암호화////
  const shasum = crypto.createHash("sha1");
  shasum.update(password);
  const hashedPassword = shasum.digest("hex");
  ///////////////////
  const user = await User.findOne({ email });

  try {
    if (user.password === hashedPassword) {
      res.send(generateToken(user._id));
      return;
    }
    res.status(400).send("User information is wrong");
  } catch (error) {
    console.log("Invoked Error in userSingInController ", error);
  }
};
export const userEditController = async (req, res) => {
  isAuthenticated(req);
  try {
    const {
      body: { password, bio, name },
    } = req;
    const shasum = crypto.createHash("sha1");
    shasum.update(password);
    const hashedPassword = shasum.digest("hex");
    await User.updateOne(
      { email: req.user.email },
      {
        $set: {
          password: password ? hashedPassword : req.user.password,
          bio: bio ? bio : req.user.bio,
          name: name ? name : req.user.name,
        },
      }
    );

    res.send("Edited successfully");
  } catch (error) {
    console.log("Invoked Error in  userEditController ", error);
  }
};

export const userCreateController = async (req, res) => {
  const {
    body: { name, email, password, bio },
  } = req;
  const shasum = crypto.createHash("sha1");
  shasum.update(password);
  const hashedPassword = shasum.digest("hex");
  try {
    await User.create({
      email,
      bio,
      name,
      password: hashedPassword,
    });
    res.status(200).send("Successfully created");
  } catch (error) {
    console.log("Invoked Error in userCreateController ", error);
  }
};

export const userInfoController = async (req, res) => {
  isAuthenticated(req);
  try {
    const user = await User.find({ email: req.user.email });

    res.send(user);
  } catch (error) {
    console.log("userInfoController ", error);
  }
};
