const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require('path');

// Cors (need to create a config file for better lisibility)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes files
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const advertRoutes = require("./routes/advert.routes");
const messageRoutes = require("./routes/message.routes");

// Middlewares always executed
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/advert", advertRoutes);
app.use("/api/message", messageRoutes);
module.exports = app;