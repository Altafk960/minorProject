const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    
  const token = req.get("Authorization");
  console.log("hello");
  console.log(req.get("Authorization"));
    
      if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        const decoded = jwt.verify(token, "something very very fishy");
          req.userId = decoded.userId;
          console.log(req.user);
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
} 

module.exports = verifyToken;