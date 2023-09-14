import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userid = req.params.userid;
  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userid], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
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
      'UPDATE users SET `displayname`=?, `city`=?, `profilepic`=?, `coverpic`=? WHERE id=(?)';

    db.query(
      q, [
        req.body.displayname,
        req.body.city,
        req.body.profilepic,
        req.body.coverpic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        if (data.affectedRows > 0) {
          return res.json("Updated");
        }
        return res.status(403).json("You can only update your profile");
      }
    );
  });
};

