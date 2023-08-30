import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = 'SELECT p.*, u.id AS userid, username, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid) LEFT JOIN relationship AS r ON (p.userid = r.followeduserid) WHERE r.followeruserid= ? OR p.userid =userid ORDER BY p.createdat DESC';

    db.query(q, [userInfo.id], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })})
}

export const addPost = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = 'INSERT INTO posts (`desc`, `img`, `createdat`, `userid`) VALUES (?)';

    const values = [
      req.body.decs,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created");
    });
  });
};
