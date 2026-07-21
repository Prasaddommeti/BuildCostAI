const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("Loading routes...");

// Routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/ai", require("../routes/aiRoutes"));
app.use("/api/estimate", require("../routes/estimateRoutes"));
app.use("/api/report", require("../routes/reportRoutes"));

app.get("/", (req, res) => {
    res.send("BuildCostAI Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});