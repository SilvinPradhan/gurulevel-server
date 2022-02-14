import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) return res.status(400).send("A human should have a name.");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("A human needs a password that is 6 characters long.");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
      return res
        .status(400)
        .send("A human with the same email already exists.");
    }
    const hashedComplete = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedComplete,
    });
    await user.save();
    console.log("USER > SAVED", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Could not create a new account. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No human found!");
    const match = await comparePassword(password, user.password);
    // signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // return user and toke to client, without hashed password
    user.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
