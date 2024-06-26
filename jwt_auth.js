const jwt = require("jsonwebtoken");

const jwtMiddleWare = (req, res, next) => {
  // We need headres such that we can know the routs
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json({ error: "Token Not Found" });

  const token = req.headers.authorization.split(" ")[1];

  // If token will not found
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify token at the time of auth or middleWare

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // Sending
    req.body = decode;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Create Token need at the time of registration or login

const generateToken = (userData) => {
  // Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET);

  // return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
};

module.exports = { jwtMiddleWare, generateToken };
