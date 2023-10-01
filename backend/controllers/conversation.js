import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const newConversation = (req, res)=> {
   
    const q = 'INSERT INTO conversations (`senderid`, `receiverid`) VALUES (?)';

    const values = [req.body.senderid, req.body.receiverid];

    db.query(q, values, (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json("Conversation has been created")
    })
}

export const getConversation = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");

    const q = 'SELECT * FROM conversations WHERE senderid = ? OR receiverid = ?';

    const values = [userInfo.id, userInfo.id];

    db.query(q, values, (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })})
}