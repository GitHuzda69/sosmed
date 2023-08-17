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
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder="Write a commnet" />
                <button>Send</button>
            </div>
            {comments.map((comment) => (
            <div className="comment">
                <img src={comment.profilePic} />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">Baru saja</span>
            </div>
            ))}
        </div>
    )
}

export default Comments;