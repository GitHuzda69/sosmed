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
app.use(Express.json())
app.use(cors())
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

app.post('/signup', (req, res) =>  {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const values = [username, email, password];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const values = [username, password];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length === 1) {
            return res.status(200).json("Success");
        } else {
            return res.json("Failed");
        }
    });
});


app.listen(8800, ()=>{
    console.log("Server Working....")
})