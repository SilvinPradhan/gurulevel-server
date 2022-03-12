import User from "../models/user";
import queryString from "query-string";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const makeInstructor = async (req, res) => {
  try {
    // Find user from database
    const user = await User.findById(req.user._id).exec();
    // if user do not have stripe_account_id, then create new stripe id
    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({ type: "express" });
      console.log(account.id);
      user.stripe_account_id = account.id;
      user.save();
    }
    // create acc link based on account id for frontend to complete onboarding
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });
    console.log(accountLink);
    // pre-fill any info such as email , then send url response to frontend
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    });
    // then send the account link as respond to frontend
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
  } catch (err) {
    console.log("Error upgrading to instructor", err);
  }
};

export const getAccountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    console.log("Account stripe => ", account);
    if (!account.charges_enabled) {
      return res.status(401).send("Unauthorized.");
    } else {
      const statusUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
          $addToSet: { role: "Instructor" },
        },
        { new: true }
      )
        .select("-password")
        .exec();
      res.json(statusUpdated);
    }
  } catch (err) {
    console.log(err);
  }
};
