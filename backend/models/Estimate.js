const Estimate = require("../models/Estimate");


exports.createEstimate = async(req,res)=>{

    const {projectType, area} = req.body;


    const cement = area * 0.4;
    const steel = area * 4;
    const sand = area * 0.5;
    const labourCost = area * 250;


    const totalCost =
        (cement * 450) +
        (steel * 70) +
        (sand * 60) +
        labourCost;


    const estimate = await Estimate.create({
        projectType,
        area,
        cement,
        steel,
        sand,
        labourCost,
        totalCost
    });


    res.json({
        success:true,
        estimate
    });

};