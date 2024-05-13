export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/merndb",
  EXPIRE_TIME_TOKEN: process.env.EXPIRE_TIME_TOKEN || "60000",
  TOKEN_SECRET: process.env.TOKEN_SECRET || "secret",
};

// "mongodb+srv://rodrigoscalise2010:1jtZN0xxFfNXKh5d@test1mongodb.kvjyzzz.mongodb.net/?retryWrites=true&w=majority&appName=test1mongodb",
// "mongodb://localhost:27017/merndb",