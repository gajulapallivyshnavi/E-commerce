import User from "../models/user-model.js";
const checkAccountStatus = async (req, res, next) => {
  const user = await User.findById(req.currentUser.userId);
  if (user.status == "active") {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "your account is decativated,please contact the admin" });
  }
};
export default checkAccountStatus;
