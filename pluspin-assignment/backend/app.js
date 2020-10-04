const express = require("express");

const app = express();
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use("/api", userRoutes);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

module.exports = app;