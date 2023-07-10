const express = require('express')
const router = express.Router()
const User = require('../models/User')
//if we have to use the req.body



//Create a user using POST "/api/auth/".Doesnot require auth



router.get('/',(req,res)=>{
    const user = User(req.body)
    user.save()
    console.log(req.body)
    res.send(req.body)
})

module.exports = router