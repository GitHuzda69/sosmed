const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "huzda"
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


app.listen(8081, ()=>{
    console.log("listening....")
})