const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};
module.exports = { connectDb };
// mongodb+srv://kakarot1725_db_user:WkFyVbEXeCGuHUqn@firstdb.zmi2jym.mongodb.net/?appName=Firstdb
