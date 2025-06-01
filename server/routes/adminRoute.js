const router = require("express").Router();
const User = require("../models/userModel");

const authMiddleware = require("../middlewares/authMiddleware");

// get all users
router.get("/get-all-users", async (req, res) => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.send({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });
  
  // update user
  router.post("/update-user", authMiddleware, async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.body.userId, req.body);
      res.send({
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  // delete a user
router.post("/delete-user", authMiddleware, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.body.userId);
      res.send({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  module.exports = router;