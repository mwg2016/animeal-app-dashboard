const User = require('../models/loginmodel');

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password)

  try {
    const user = await User.getLoginDetails(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { adminLogin };
