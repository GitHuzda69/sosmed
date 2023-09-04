import { db } from "../connect.js"
import jwt from "jsonwebtoken";

export const getLikes = (req,res)=>{
    const q =  'SELECT userid FROM likes WHERE postid = ?';

    db.query(q, [req.query.postid], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like=>like.userid));
    })
}