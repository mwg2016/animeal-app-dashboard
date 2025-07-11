const bcrypt = require("bcryptjs");
const Admin = require("../models/profileModel");

const changePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const admin = await Admin.getAdminByUsername(username);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const storedPassword = admin.password;

    const isHashed = storedPassword.startsWith("$2");

    let isMatch;

    if (isHashed) {
      isMatch = await bcrypt.compare(oldPassword, storedPassword);
    } else {
      isMatch = oldPassword === storedPassword;
    }

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const newHashedPassword = isHashed
      ? await bcrypt.hash(newPassword, 10)
      : newPassword;

    await Admin.updateAdminPassword(username, newHashedPassword);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { changePassword };
