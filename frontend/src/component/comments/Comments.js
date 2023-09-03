import "./Comments.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useQuery,useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postid }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState(undefined);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postid="+postid).then((res) => {
      return res.data;
    }))

    const queryClient = useQueryClient();

    const mutation = useMutation((newComment) =>{
      return makeRequest.post("/comments", newComment);
    },{
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"])
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
