import { useState } from "react";
import Comments from "../comments/Comments";
import "./Post.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react"

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false)

    //SEMENTARA
    const liked = true;

    return (
        <div className='post'>
            <div className="user">
                <div className="userIndo">
                    <img src={post && post.img} alt="" />
                    <div className="details">
                        <Link to={'/profile/${post.userId}'} style={{}}>
                        <span>{post && post.name}</span>
                        <span className="date">Baru saja</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="content">
                <p>{post && post.desc}</p>
                <img src={post && post.img} alt="" />
            <div className="info">
                <div className="item">
                    {liked}
                    12 Likes
                </div>
                <div className="item" onClick={()=>setCommentOpen(commentOpen)}>
                    {liked ? <Icon icon="ant-design:message-filled" width="40" height="40"/> : <Icon/>}
                    12 Comment
                </div>
                <div className="item">
                    {liked}
                    Share
                </div>
            </div>
            {commentOpen && <Comments />}    
            </div> 
        </div>
    )
}

export default Post