import jwt from "jsonwebtoken";
import { config } from "../config.js";

// "60000" = 1 minute, "300000" = 5 minutes, "1d";
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: config.EXPIRE_TIME_TOKEN }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
