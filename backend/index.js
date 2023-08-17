import Express from "express";
import mysql from "mysql";
import authRoutes from "./routes/auth.js";
import userRoutes from  "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import cookieParser from "cookie-parser";
import cors from "cors"


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
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)

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