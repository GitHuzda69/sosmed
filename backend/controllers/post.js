import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!tokne) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = 'SELECT p.*, u.id AS userid, name FROM posts AS p JOIN users AS u ON (u.id = p.userid)';
    const q1 = 'SELECT p.*, u.id AS userid, name FROM posts AS p JOIN users AS u ON (u.id = p.userid) JOIN relationship AS r ON (p.userid = r.followeduserid AND r.followeruserid = ?)';
    const q2 = 'SELECT p.*, u.id AS userid, name FROM posts AS p JOIN users AS u ON (u.id = p.userid) LEFT JOIN relationship AS r ON (p.userid = r.followeduserid) WHERE r.followeruserid= ? OR p.userid= ? ORDER BY p.createdat DESC';

    db.query(q, [userInfo.id], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })})
}

export const addPost = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!tokne) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = "INSERT INTO posts (`desc`, `img`, `createdat` `userid`) VALUES (?)";

    const values = [
        req.body.desc,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id
    ]

    db.query(q, [userInfo.id], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created")
    })})
}