const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

// update user
router.post("/update-user", authMiddleware, async (req, res) => {
  try {
    const { userId, password, ...otherUpdates } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      otherUpdates.password = hashedPassword;
    }

    await User.findByIdAndUpdate(userId, otherUpdates, { new: true });
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

module.exports = router;
