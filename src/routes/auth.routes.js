import { Router } from "express"
import {
  register,
  login,
  logout,
  profile,
  users,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"

const router = Router();

router.get("/", (req, res) => res.send("Hello World!"));
router.post("/register", validateSchema(registerSchema), register);
router.options('*');
router.post("/login", login); // validateSchema(loginSchema)
router.post("/verify-token", authRequired, profile);
router.delete("/logout", logout)
router.get("/users", users)
router.get("/profile", authRequired, profile);

export default router;