const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const JWT_SECRET="Jashanisagood$boy"
// / means root
router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
//if there are errors , return bad requests and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try
  {
  //check whether the user with this email exists already
  let user = await User.findOne({email:req.body.email})
  if(user)
  {
    return res.status(400).json({error:"Sorry a user with this email already exists"}) //sending 400 status code and we send a json
  }
  const salt = await bcrypt.genSalt(10); //create a salt
  const secPass = await bcrypt.hash(req.body.password,salt); //hash the password with the salt you created
  //create a new user
  user = await User.create({
 name:req.body.name,
 password:secPass,
 email:req.body.email
});
const data = {
  user:{
    id:user.id
  }
}
const authtoken = jwt.sign(data,JWT_SECRET);
res.send(authtoken) //sending the authentication token which basically is a protocol for future purposes
}
catch(error)
{
console.log(error.message)
res.send(500).send("Internal Server Error")
}
})


//Authenticate a user post "api/auth/login"
router.post('/login',[
body('email','Enter a valid email address').isEmail(),body('password','Password cannot be blank').exists()], async (req,res) =>
{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  try
  {
      let user = await User.findOne({email})
      if(!user)
      {
        return res.status(400).json({error:"Email or password is incorrect"})
    
      }
      const passwordCompare = await bcrypt.compare(password,user.password) //returns a promise we need to wait for this to finish
      if(!passwordCompare)
      {
        return res.status(400).json({error:"Email or password is incorrect"})
      }
      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET)
      res.json({authtoken})

  }
  catch(error)
  {
    console.log(error.message)
res.status(500).send("Internal Server Error")
  }

}
)
module.exports = router;