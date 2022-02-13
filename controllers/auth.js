import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

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
