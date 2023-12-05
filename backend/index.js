const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const googleRoutes = require("./routes/google");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const likeRoutes = require("./routes/likes");
const RelationshipRoutes = require("./routes/relationships");
const conversationRoutes = require("./routes/conversations");
const messageRoutes = require("./routes/messages");

dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

connectToDatabase();

// Middlewares
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));


// Middleware to handle file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

// Use file upload middleware for the specific route
app.post("/api/upload", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json("File upload failed");
    }
    next();
  });
}, (req, res) => {
  return res.status(200).json("File uploaded successfully");
});

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/auth', googleRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/relationships', RelationshipRoutes)
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes)

app.listen(8800, () => {
  console.log("Backend server is running!");
});

module.exports = app;