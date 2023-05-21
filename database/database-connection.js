const mongoose = require("mongoose");
const { adminGenerator } = require("../services/user-service");

const dataBaseConnection = async () => {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
  console.log("[i] DB is connected..");
  adminGenerator();
};

module.exports = dataBaseConnection;
