const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const TOKEN_KEY = "something very very fishy";

exports.postLogin = async (req, res, next) => {
 
    const { email, password } = req.body;
    if (!(email && password)) {
     return res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    let existingUser = await User.findOne({ email });

    if (existingUser && (await bcrypt.compare(password, existingUser.password))) {

      const token = jwt.sign(
          { userId: existingUser._id },
          TOKEN_KEY,
          {
              expiresIn: "2h",
          }
      );
      // save user token
      console.log(token);
      
      let user = {
        userId: existingUser._id,
        token: token
      }

      console.log(user);

      // user
      return res.status(200).json({
        user,
        message: "LOGIN_SUCCESSFUL"
      });
    }
    res.status(400).send("INVALID_CREDENTIALS");
  }
  // Our register logic ends here


exports.postSignup = async (req, res, next) => {
  console.log("hello");
    const { email, password , confirmPassword } = req.body;

      const oldUser = await User.findOne({ email } );

      if (oldUser) {
      console.log(oldUser);
        return res.json({ message: "USER_ALREADY_EXISTS"});
      }
  

  const hashedPassword = await bcrypt.hash(password, 12);
  
  

    let user = new User({
      email: email.toLowerCase(),
      password: hashedPassword, 
    });
  
  console.log(user);

  await user.save().then(
    result => {
return res.json({
  message: "SIGNUP_SUCCESSFUL",
});
    }
  ).catch(err => {
    console.log(err);
  });
      
}
