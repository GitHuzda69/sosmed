import { db } from "../connect.js"
import jwt from "jsonwebtoken";


export const getRelationships = (req,res) => {
const q = 'SELECT followeruserid FROM relationships WHERE followeduserid = ?';

    db.query(q, [req.query.followeduserid], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship=>relationship.followeruserid))
    })
}

export const addRelationship = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = 'INSERT INTO relationships (`followeruserid`, `followeduserid`) VALUES (?)';

    const values = [
        userInfo.id,
        req.body.userId
    ]

    db.query(q, [values], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json("Following")
    })})
}

export const deleteRelationships = (req, res)=> {
    const token = req.cookies.accessToken;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    
    
    const q = 'DELETE FROM relationships WHERE `followeruserid` = ? AND `followeduserid` = ?';

    db.query(q, [userInfo.id, req.query.userId], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json("Unfollow")
    })})
}