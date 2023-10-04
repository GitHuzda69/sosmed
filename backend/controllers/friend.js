import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getFriend = (req, res)=> {
    const token = req.cookies.accessToken;
    const userId = req.query.userid;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    

    const q = 'SELECT u.id AS userid, displayname, profilepic, coverpic, biodata FROM users AS u LEFT JOIN relationships AS r ON (u.id = r.followeduserid) WHERE r.followeruserid= ?';

    const values = [userInfo.id];

    db.query(q, values, (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })})
}