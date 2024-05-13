import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const authRequired = (req, res, next) => {
  console.log("authRequired req", req);
  const { token } = req.cookies;
  
  if (!token) return res
    .status(403)
    .json({ status: "error", error: "Authorization failed" });
  
  jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
    console.log("validateToken error", err);
    if (err?.name == "TokenExpiredError") {
      return res.status(401).json({ status: "error", error: "Token expired" });
    }
    if (err) return res.status(403).json({ status: "error", error: "Authorization failed" });
    req.user = user;
    next();
  });
}