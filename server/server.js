const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const app = express();
app.use(cors());

// Use body-parser to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define your routes
app.use("/news", newsRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Connect to the database
connectDB();

// Define the port to listen on
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
