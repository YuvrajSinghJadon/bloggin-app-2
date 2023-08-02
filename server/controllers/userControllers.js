import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";

//user controllers
export const createUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ msg: "Signup successfull" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong while Signingup", error });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
  }
  try {
    let match = bcrypt.compareSync(password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.JWT_ACCESS_SECRET
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.JWT_REFRESH_SECRET
      );
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      res.status(401).json({ msg: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong while login", error });
  }
};

export const logoutUser = async (req, res) => {
  const token = req.body.token;
  await Token.deleteOne({ token: token });

  res.status(200).json({ msg: "Logout successfull" });
};
