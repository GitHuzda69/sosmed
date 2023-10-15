import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const newConversation = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(402).json("Not logged in");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token not valid");
  
      const q = 'INSERT INTO `conversations` (`senderid`, `receiverid`) VALUES (?, ?)';
      const values = [userInfo.id, req.body.userId];
  
      db.query('SELECT * FROM `conversations` WHERE (`senderid` = ? AND `receiverid` = ?) OR (`receiverid` = ? AND `senderid` = ?)',
        [...values, ...values],
        (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.length) return res.status(409).json("Conversation already exists!");
          db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
  
            return res.status(200).json(data);
          });
        }
      );
    });
  };

export const getConversation = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");

    const q = 'SELECT DISTINCT c.*, u.profilepic, u.displayname, u.biodata FROM conversations AS c JOIN users AS u ON (c.senderid = u.id OR c.receiverid = u.id) WHERE (c.senderid = ? OR c.receiverid = ?) AND u.id <> ?';

    const values = [userInfo.id, userInfo.id, userInfo.id];

    db.query(q, values, (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })})
}