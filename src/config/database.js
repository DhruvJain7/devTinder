const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://kakarot1725_db_user:WkFyVbEXeCGuHUqn@firstdb.zmi2jym.mongodb.net/devTinder?appName=Firstdb",
  );
};
module.exports = { connectDb };
// mongodb+srv://kakarot1725_db_user:WkFyVbEXeCGuHUqn@firstdb.zmi2jym.mongodb.net/?appName=Firstdb
