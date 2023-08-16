import { makeRequest } from "../../axios";
import Post from "../post/Post"
import "./Posts.css"
import avatar1 from "../../assets/profil.jpg"
import foto from "../../assets/friend/friend1.jpg"
import { useQuery } from "@tanstack/react-query";

const Posts = () => {
    const posts = [
        // DATA DUMMY 
        {
        id:1,
        name: "User 1",
        userId: "1",
        profilePic: avatar1,
        decs: "Lorem ipsum dolor sit amet conseceru adipiscing elist",
        img:foto
    },
        {
        id:1,
        name: "User 1",
        userId: "1",
        profilePic: avatar1,
        decs: "Lorem ipsum dolor sit amet conseceru adipiscing elist",
        img:foto
    },
        {
        id:1,
        name: "User 1",
        userId: "1",
        profilePic: avatar1,
        decs: "Lorem ipsum dolor sit amet conseceru adipiscing elist",
        img:foto
    },
]
    const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get("/posts").then(res=>{
        return res.data;
    })
    )

    return (
    <div className="posts">
        {posts.map(post=>(
            <Post post={post} key={post.id}/>
        ))}
    </div>
    )}

export default Posts;