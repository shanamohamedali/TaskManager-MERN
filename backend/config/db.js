const mongoose = require("mongoose");
require('dotenv').config()

const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.Mongo_URL);
    console.log("Database started at:",connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
