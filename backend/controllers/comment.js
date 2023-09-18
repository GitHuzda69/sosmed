import { db } from "../connect.js";
import jwt from "jsonwebtoken"
import moment from "moment"

export const getComments = (req, res)  => {
    
    const q = 'SELECT c.*, u.id AS userid, displayname, img, profilepic FROM comments AS c JOIN users AS u ON (u.id = c.userid) WHERE c.postid = ? ORDER BY c.createdat DESC';

    db.query(q, [req.query.postid], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
}

export const addComments = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = 'INSERT INTO `comments` (`desc`, `img`, `createdat`, `userid`, `postid`) VALUES (?)';

    const values = [
        req.body.desc,
        req.body.file,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.postid
    ]

    db.query(q, [values], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comments has been created")
    })})
}

export const deleteComment = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = 'DELETE FROM comments WHERE `id`=? AND `userid`=?';


    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affetedRows > 0) return res.status(200).json("Comments has been deleted!");
      return res.status(200).json("Comments has been created");
    });
  });
};