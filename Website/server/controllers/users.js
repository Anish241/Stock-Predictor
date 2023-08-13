import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getUser = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({user ,message: "User logged in successfully" });
    } catch (error) {

      res.status(500).json({ message: "Something went wrong" });
      
    }

};

const createUser = async (req, res) => {
  try{
  const { Name, username, email, password} = req.body;
  const user = await User.findOne({ username });
  const userE = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  if (userE) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({Name ,username,email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
}catch(error){
  res.status(500).json({ message: "Something went wrong" });
}};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


export {getUser,createUser,verifyToken}
