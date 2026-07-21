const User = require("../models/User");


exports.createUser = async (req,res)=>{

    try{

        const user = await User.create(req.body);

        res.status(201).json({
            success:true,
            user
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};