// userController.js

const User = require("../data/models/userModel");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      tcNumber: req.body.tcNumber,
      role: req.body.role || "gönüllü", // rol varsayılan olarak "user" olarak ayarlanır
    });
    console.log(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "yetkili") {
      return res.status(403).json({ error: "Access denied" });
    }
    await user.delete();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getUserData = async (req, res) => {
  try {
    // Get the user data from the token
    const { name, lastName, role } = req.user;

    // Find the user in the database
    const user = await User.findOne({ name, lastName });

    // Return the user data
    res.json({
      name: user.name,
      lastName: user.lastName,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
