import { useState } from "react";
import Comments from "../comments/Comments.js";
import "./Post.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react"

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false)

    //SEMENTARA
    const liked = true;

    return (
        <div className='post'>
            <div className="container">
                <div className="user">
                    <div className="userinfo">
                        <Link to={'/profile/${post.userId}'} style={{ textDecoration: "none", color:"inherit" }}>
                        <img className="profile" src={post.profilePic} alt="" />
                        <div className="details">
                        <span className="name">{post.name}</span>
                        <span className="date">Baru saja</span>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="content"> 
                <p className="desc">{post.desc}</p>
                <img className="content-img" src={post.img} alt="" />
            </div>
            <div className="info">
                <div className="item">
                        {liked ? <Icon icon="mdi:heart" width={20} height={20} color={"black"} /> : 
                        <Icon icon="mdi:heart-outline"
                        width={20}
                        height={20}
                        color={"red"}
                      />}
                    12 Likes
                </div>
                <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                    {liked ? <Icon icon="ant-design:message-filled" width={20} height={20}/> : <Icon/>}
                    12 Comment
                </div>
                <div className="item">
                    {liked ? <Icon icon="ant-design:message-filled" width={20} height={20}/> : <Icon/>}
                    Share
                </div>
            </div>
            {commentOpen && <Comments />}    
        </div>
    )
}

export default Post