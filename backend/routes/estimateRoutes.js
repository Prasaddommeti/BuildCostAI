const express = require("express");
const router = express.Router();

const {createEstimate} = require("../controllers/estimateController");


router.post("/create", createEstimate);


module.exports = router;