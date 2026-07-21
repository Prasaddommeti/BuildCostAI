const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/authController");


router.post("/register", createUser);


router.get("/", (req,res)=>{
    res.json({
        message:"Auth API working"
    });
});


module.exports = router;