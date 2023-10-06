import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res)=> {
    const token = req.cookies.accessToken;
    const userId = req.query.userid;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    

    const q = userId !== "undefined"
    ? 'SELECT DISTINCT p.*, u.id AS userid, displayname, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid) WHERE p.userid = ? ORDER BY p.createdat DESC' 
    : 'SELECT DISTINCT p.*, u.id AS userid, displayname, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid) LEFT JOIN relationships AS r ON (p.userid = r.followeduserid) WHERE r.followeruserid= ? OR p.userid = ? ORDER BY p.createdat DESC';

    const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })})
}
export const getFyp = (req, res)=> {
    const token = req.cookies.accessToken;
    const userId = req.query.userid;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    

    const q = 'SELECT DISTINCT p.*, u.id AS userid, displayname, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid) LEFT JOIN relationships AS r ON (p.userid = r.followeduserid) ORDER BY p.createdat DESC';

    const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })})
}

export const addPost = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = 'INSERT INTO `posts` (`desc`, `img`, `createdat`, `userid`) VALUES (?)';

    const values = [
      req.body.desc,
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

export const deletePost = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = 'DELETE FROM posts WHERE `id`=? AND `userid`=?';


    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affetedRows > 0) return res.status(200).json("Post has been deleted!");
      return res.status(200).json("Post has been created");
    });
  });
};

export const updatePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Authenticated!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) {
        return res.status(403).json("Token not valid");
      }
  
      if (!userInfo || !userInfo.id) {
        return res.status(403).json("User information not found in token");
      }
  
      const q =
        'UPDATE posts SET `desc`=?, `img`=? WHERE id=(?)';
  
      db.query(
        q, [
          req.body.desc,
          req.body.img,
          req.params.id,
        ],
        (err, data) => {
          console.log(req.body.desc,
            req.body.img,
            req.params.id,)
          if (err) {
            return res.status(500).json(err);
          }
          if (data.affectedRows > 0) {
            return res.json("Updated");
          }
          return res.status(403).json("You can only update your post");
        }
      );
    });
  };