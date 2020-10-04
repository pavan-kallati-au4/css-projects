const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

const app = require("./app");

const DB = `mongodb+srv://schoolAdmin:SGRuYS99RGjM3dWb@schoolmanagement-rrjcu.mongodb.net/SchoolManagement?retryWrites=true&w=majority`

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// unhandledRejection - Occurs when someone tries to access
// the database with invalid password
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});