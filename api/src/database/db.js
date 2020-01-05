const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  error => {
    if (error) {
      console.log(`Error while connecting to MongoDB:\n${error}`);
    } else {
      console.log("MongoDB is connected");
    }
  }
);
