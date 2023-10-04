import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const addMessage = (req, res)=> {
  const token = req.cookies.accessToken;
  if(!token) return res.status(402).json("Not logged in")

  jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token not valid");
  
  const q = 'INSERT INTO messages (`desc`, `img`, `createdat`, `senderid`, `receiverid`) VALUES (?)';

  const values = [
    req.body.desc,
    req.body.img,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    userInfo.id,
    req.body,receiverid
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Message has been send");
  });
});
};

export const getMessage = (req, res)=> {
    const token = req.cookies.accessToken;
    const userId = req.query.userid;
    if(!token) return res.status(402).json("Not logged in")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
    

    const q = 'SELECT * FROM messages WHERE id= ?';

    const values = req.body.message.id;

    db.query(q, values, (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })})
}