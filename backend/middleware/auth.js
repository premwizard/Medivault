const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  try {
    // Check both headers: "Authorization: Bearer <token>" OR "x-auth-token"
    const authHeader = req.headers.authorization;
    const token =
      (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]) ||
      req.headers["x-auth-token"];

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    // Verify JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user payload to request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error("JWT Auth Error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
