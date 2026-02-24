const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signup successful",
      success: true,
      user: {
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    profilePhotoUrl: newUser.profilePhotoUrl,
          isAdmin: newUser.isAdmin,
  },
    });
  } catch (err) {
    // duplicate key error (unique username/email)
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Username or email already exists",
        success: false,
      });
    }

    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 6 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Signin successful",
        success: true,
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePhotoUrl: user.profilePhotoUrl,
          isAdmin: user.isAdmin,
        },
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


const google = async (req, res) => {

  try {
    const { email, name, googlePhotoUrl } = req.body;
        

    if (!email || !name) {
      return res.status(400).json({
        message: "Email and name are required",
        success: false,
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Existing user → just login
      const token = jwt.sign({ id: user._id , isAdmin : user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: "6h",
      });

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: false, // true in production (HTTPS)
          sameSite: "strict",
          maxAge: 6 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: "Signin successful",
          success: true,
          token,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePhotoUrl: user.profilePhotoUrl,
            isAdmin: user.isAdmin,
          },
        });
    }

    // If user does not exist → create new user
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = new User({
      username:
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePhotoUrl: googlePhotoUrl,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id , isAdmin : newUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 6 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Signup successful via Google",
        success: true,
        token,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          profilePhotoUrl: newUser.profilePhotoUrl,
            isAdmin: newUser.isAdmin,
        },
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { signup, signin, google };
