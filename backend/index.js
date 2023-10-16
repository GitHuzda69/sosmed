const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const router = express.Router();
const path = require("path");
import authRoutes from "./routes/auth.js";
import userRoutes from  "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import RelationshipRoutes from "./routes/relationships.js";
import friendsRoutes from "./routes/friends.js";
import conversationRoutes from "./routes/conversations.js";
import messageRoutes from "./routes/messages.js";

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );
  app.use("/images", express.static(path.join(__dirname, "public/images")));

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/relationships', RelationshipRoutes)
app.use('/api/friends', friendsRoutes)
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes)

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sosmed"
});

app.listen(8800, () => {
    console.log("Backend server is running!");
  });