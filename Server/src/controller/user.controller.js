const bcrypt = require('bcrypt');
// import bcrypt from 'bcrypt';
const User = require('../models/user.model');
// import User from '../models/user.model.js';

const ping = (req, res) => {
  res.send("API AND ROUTING SETUP IS COMPLETE!!");
};

const updateUser = async (req, res, next) => {
  // console.log(req.user);

  if (req.user.id !== req.params.userId) {
    return res
      .status(403)
      .json({ message: "You are not allowed to do update this user" });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must at leat 6 characters" });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return res
        .status(400)
        .json({ message: "UserName must be in between 7 and 20 characters" });
    }
    if (req.body.username.includes(" ")) {
      return res
        .status(400)
        .json({ message: "Username cannot contain spaces" });
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json({ message: "Username must be lowercase" });
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return res
        .status(400)
        .json({ message: "Username can only contain letters and numbers" });
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePhotoUrl: req.body.profilePhotoUrl,
          password: req.body.password,
        },
      },
      { new: true },
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};


const deleteUser = async (req, res, next) => {

  if (!req.user.isAdmin  && req.user.id !== req.params.userId) {
    return res      .status(403)
      .json({ message: "You are not allowed to delete this user" });
  } 
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({message:"User Deleted Successfully"});
    } catch (err) {
        next(err);
    }
};


const signoutUser = async (req, res, next) => {

  
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite: 'lax',
        });
        res.status(200).json({message:"User Signout Successfully"});
    } catch (err) {
        next(err);
    }
};



const getUsers = async (req,res,next) =>{

  if(!req.user.isAdmin){
    return next(res.status(403).json({message:"You are not allowed to see all users"}));
  }
  try{

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({createdAt : sortDirection})
      .skip(startIndex)
      .limit(limit);

      const userWithoutPassword = users.map((user)=>{

        const {password,...rest} = user._doc;
        return rest;

      });

      const totalUsers = await User.countDocuments();

      const now = new Date();

      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );

      const lastMonthUsers = await User.countDocuments({
        createdAt : {$gte:oneMonthAgo}
      });

      res.status(200).json({
        users:userWithoutPassword,
        totalUsers,
        lastMonthUsers,
      });
  }catch(err){
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};




module.exports = { ping, updateUser, deleteUser, signoutUser ,getUsers,getUser };
