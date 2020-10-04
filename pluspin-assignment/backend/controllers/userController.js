const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getUser = catchAsync(async (req, res, next) => {
  res.json({
    data: req.user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate({ _id: req.user._id }, { ...req.body }, { new: true });

  res.json({
    message: "Profile info has been udpdated sucessfully",
    data: user
  })
});