const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const googleRoutes = require("./routes/google");
const FBRoutes = require("./routes/facebook");
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
const allowedOrigins = ["http://localhost:3000", "http://localhost:8800"];
// Middlewares
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/auth', googleRoutes)
app.use('/api/auth', FBRoutes)
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