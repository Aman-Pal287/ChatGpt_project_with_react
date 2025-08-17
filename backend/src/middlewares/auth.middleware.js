const { model } = require("mongoose");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* db ke data se pasword hata ke data bhejna frontend pe */
    const user = await userModel.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  authUser,
};
