const { users } = require("../data/users");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  });
};
