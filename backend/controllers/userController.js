const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const generateToken = require("../utils/generateToken")

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if( !isPasswordValid ){
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "User logged in successfully",
            user,
            token
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

const getProfile = async (req, res) => {
    res.status(200).json({
        user: req.user
    })
}

module.exports = {
  createUser,
  loginUser,
  getProfile,
};