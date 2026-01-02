require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
