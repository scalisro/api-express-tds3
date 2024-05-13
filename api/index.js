import app from "../src/app.js";
import { connectDB } from "../src/db.js";
import { config } from "../src/config.js";

console.log("pass for api/index...");
connectDB();
app.listen(config.PORT);
console.log(`Server running in ${config.NODE_ENV} on port`, config.PORT);