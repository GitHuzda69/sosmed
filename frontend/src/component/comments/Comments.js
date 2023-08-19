import "./Comments.css";
import avatar1 from "../../assets/profil.jpg"
import { useContext } from "react";
import AuthContext from "../../context/authContext.js";

const Comments = () => {
    const { currentUser } = useContext(AuthContext)

    // DATA DUMMY
    const comments = [
        {
            id:1,
            desc:"Lorem ipsum dolor sit amet conseceru adipiscing elist",
            name:"User 1",
            userId:"1",
            profilePic:avatar1
        },
        {
            id:1,
            desc:"Lorem ipsum dolor sit amet conseceru adipiscing elist",
            name:"User 1",
            userId:"1",
            profilePic:avatar1
        },
        {
            id:1,
            desc:"Lorem ipsum dolor sit amet conseceru adipiscing elist",
            name:"User 1",
            userId:"1",
            profilePic:avatar1
        },
    ]

    return (
        <div className="comments">
            <div className="write">
                <img src={comments.profilePic} alt="" />
                <input className="comment-input" type="text" placeholder="Write a comment" />
                <button className="comment-button">Send</button>
            </div>
            {comments.map((comment) => (
            <div className="comment">
                <img className="comments-pic" src={comment.profilePic} />
                <div className="comment-info">
                    <span className="name">{comment.name}</span>
                    <p className="desc">{comment.desc}</p>
                </div>
                <span className="comment-date">Baru saja</span>
            </div>
            ))}
        </div>
    )
}

export default Comments;