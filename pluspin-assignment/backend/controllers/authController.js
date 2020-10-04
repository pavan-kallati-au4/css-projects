const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");

const User = require("../models/userModel");

const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'managmentschool007@gmail.com',
    pass: 'school*94'
  }
});

const JWT_SECRET = "XpO4ZaX2P8jwBRYqjbuY";
const JWT_EXPIRES = "90d";

exports.signup = catchAsync(async (req, res, next) => {

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Provide a valid email"
    })
  }

  let otp = Math.floor(Math.random() * 100000)
  while (otp < 10000) {
    otp = Math.floor(Math.random() * 100000)
  }
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, otp });
  } else {
    user = await User.findByIdAndUpdate({ _id: user._id }, { otp })
  }

  let mailDetails = {
    from: 'managmentschool007@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `OTP to login: ${otp}`
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      return res.status(400).json({
        message: "Provide a valid email"
      })
    } else {
      res.json({
        message: "OTP has been sent to your email."
      });
    }
  });

});

exports.login = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Provide valid email or OTP"
    });
  }

  const user = await User.findOne({ email, otp });
  console.log(user);
  if (!user) {
    return res.status(400).json({
      message: "Wrong OTP",
    });
  }

  await User.findByIdAndUpdate({ _id: user._id }, { otp: 0 });

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  res.header("auth-token", token).json({
    status: true,
    data: user,
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in! Please log in to get access.",
    });
  }

  const user = await promisify(jwt.verify)(token, JWT_SECRET);

  const currentUser = await User.findById(user._id);

  if (!currentUser) {
    return res.status(401).json({
      message: "The user belonging to this token does no longer exist.",
    });
  }

  req.user = currentUser;

  next();
});