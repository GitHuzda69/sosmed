import Express from "express";
import mysql from "mysql";
import authRoutes from "./routes/auth.js";
import userRoutes from  "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import RelationshipRoutes from "./routes/relationships.js";
import friendsRoutes from "./routes/friends.js";
import conversationRoutes from "./routes/conversations.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import multer from "multer";

const app = Express()
//middlewares
app.use((req, res, next) =>{
    res.header("Access-Control_Allow_Credentials", true)
    next()
})
app.use(Express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser())

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../frontend/public/data')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        } 
    })

    const upload = multer({ storage: storage })

app.post('/api/upload', upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/relationships', RelationshipRoutes)
app.use('/api/friends', friendsRoutes)
app.use('/api/conversations', conversationRoutes)

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sosmed"
});

db.connect((err) => {
    if (err) {
        console.error("Gagal", err);
        return;
    }
    console.error("Success");
})

app.listen(8800, ()=>{
    console.log("Server Working....")
})