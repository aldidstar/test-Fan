const secretKey = "aldi";
var jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: function (req, res, next) {
    var token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: "Failed to authenticate token.",
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          req.userId = decoded.id;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: "No token provided.",
      });
    }
  },
  decodeToken: function (token) {
    var decoded = jwt.decode(token);
    return decoded;
  },
};
