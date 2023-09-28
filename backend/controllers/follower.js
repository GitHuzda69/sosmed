import { db } from "../connect.js";
import jwt from "jsonwebtoken"

export const getFollower = (req, res)  => {
    
    const q = 'SELECT userid, displayname, img, profilepic FROM users JOIN users AS u ON (u.id = p.userid) LEFT JOIN relationships AS r ON (p.userid = r.followeduserid) WHERE r.followeruserid= ? OR p.userid = ? ORDER BY p.createdat DESC';

    db.query(q, [req.query.postid], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
}