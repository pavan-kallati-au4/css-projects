const express = require("express");

const app = express();
const cors = require("cors");
const path = require('path');

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

module.exports = app;