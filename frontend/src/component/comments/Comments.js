import "./Comments.css";
import avatar1 from "../../assets/profil.jpg";
import friend1 from "../../assets/friend/friend1.jpg";
import friend5 from "../../assets/friend/friend5.jpeg";
import friend2 from "../../assets/friend/friend2.jpg";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useQuery,useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({postid}) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState('');
  // DATA DUMMY
  const comment = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet conseceru adipiscing elist",
      name: "User 1",
      userId: "1",
      profilePic: friend1,
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet conseceru adipiscing elist",
      name: "User 2",
      userId: "2",
      profilePic: friend2,
    },
    {
      id: 3,
      desc: "Lorem ipsum dolor sit amet conseceru adipiscing elist",
      name: "User 3",
      userId: "3",
      profilePic: friend5,
    },
    {
      id: 4,
      desc: "Lorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elisLorem ipsum dolor sit amet conseceru adipiscing elist",
      name: "User 3",
      userId: "3",
      profilePic: friend5,
    },
  ];

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId="+postid).then((res) => {
      return res.data;
    }))

    const queryClient = useQueryClient();

    const mutation = useMutation((newComment) =>{
      return makeRequest.post("/comments", newComment);
    },{
      onSuccess: () => {
        queryClient.invalidateQueries(["[comments]"])
      }
    })
    
    const handleClick = async (e) => {
      e.preventDefault();
      mutation.mutate({desc, postid })
      setDesc("")
    };
  
    return (
    <div className="comments">
      <div className="write">
        <img className="leftBarUser" src={currentUser.profilepic} alt="" />
        <input
          className="input-comment"
          type="text"
          placeholder="Write a comment"
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
        />
        <button className="button-comment" onClick={handleClick}>
          <Icon icon="material-symbols:send" height={30} width={30} />
        </button>
      </div>
      {error ? "Something went wrong" : isLoading ? "loading" : data.map((comments) => (
        <div className="comment">
          <img className="comments-pic" src={comments.profilepic} />
          <div className="comment-info">
            <span>{comments.username}</span>
            <p>{comments.desc}</p>
          </div>
          <span className="comment-date">{moment(comments.createdat).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
