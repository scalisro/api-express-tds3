import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

const DUPLICATE_USER_CODE = 11000;

export const register = async (req, res) => {
  // res.send('Registered!')
  const { userName, userEmail, userPassword } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(userPassword, 10);

    const newUser = new User({ userName, userEmail, userPassword: passwordHash });
    const userSaved = await newUser.save();
    
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token);
    res.status(201).json({
      message: "User created succesfully",
      data: {
        id: userSaved._id,
        username: userSaved.userName,
        email: userSaved.userEmail,
        createdAt: userSaved.createdAt,
      },
    });
    
  } catch (error) {
    res.status(500).json({
      status: "error",
      error:
        error.code == DUPLICATE_USER_CODE
          ? `The user ${userEmail} already exists.`
          : error.errorResponse.errmsg,
    });
  }
};

export const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    const userFound = await User.findOne({ userEmail });

    if (!userFound) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid credentials" });
    }
    
    const isMatch = await bcryptjs.compare(
      userPassword,
      userFound.userPassword
    );

    if (!isMatch) { 
      return res
        .status(400)
        .json({ status: "error", error: "Invalid credentials" });
    }

    const token = await createAccessToken({ id: userFound._id });
    res.cookie('token', token);
    res.status(201).json({
      message: "User successfully logged in",
      data: {
        id: userFound._id,
        username: userFound.userName,
        email: userFound.userEmail,
        createdAt: userFound.createdAt,
      },
    });
    
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        error: error[0] || "Internal server error",
      });
  }
};

export const logout = (req, res) => { 
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(204);
};

export const users = async (req, res) => { 
  const users = await User.find();
  console.log(users);

  if (users.length) {
    return res.status(200).json({
      status: "success",
      data: users
    });
  }
  return res.status(404).json({ status: "error", error: "Users not found" });
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(401).json({ status: 'error', msg: 'User is not logged' });
    
    res.json({
      status: 'sucess',
      data: {
        id: userFound._id,
        email: userFound.userEmail,
        username: userFound.userName,
      }
    });
  } catch {
    res.status(401).json
  }
};

export const verifyToken = (req, res) => {
  try {
    return res.status(200).json({ data: req.user });
  } catch (error) {
    return res
      .status(403)
      .json({ status: "error", error: "No token provided." });
  }
};