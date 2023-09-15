import "./Comments.css";
import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postid }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState(undefined);
  const fileInputRef = useRef(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postid=" + postid).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (!desc) {
          return;
        }

        mutation.mutate({ desc, postid });
        setDesc("");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [desc, mutation, postid]);

  return (
    <div className="comments">
      <div className="write">
        <img
          className="comments-pic-write"
          src={"/data/" + currentUser.profilepic}
          alt=""
        />
        <input
          className="input-comment"
          type="text"
          placeholder="Write a comment . . . "
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="uploadItem-comment-row">
          <button className="uploadItem-comment">
            <Icon icon="ic:outline-poll" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem-comment">
            <Icon icon="fluent:gif-16-regular" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem-comment">
            <Icon
              icon="material-symbols:perm-media-outline"
              width={25}
              height={25}
            ></Icon>
          </button>
        </div>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comments) => (
            <div className="comment">
              <img className="comments-pic" src={"/data/" + comments.profilepic} alt="" />
              <div className="comment-info">
                <span>{comments.username}</span>
                <h3>{moment(comments.createdat).fromNow()}</h3>
                <button className="button-comment-desc">
                  <Icon icon="tabler:dots" width={20} height={20} />
                </button>
                <p>{comments.desc}</p>
                <div className="info-comment">
                  <div className="item-comment">
                    {isLoading ? (
                      "loading"
                    ) : data && data.includes(currentUser.id) ? (
                      <>
                        <Icon
                          className="icon"
                          icon="mdi:heart"
                          width={25}
                          height={25}
                          color={"red"}
                        />
                        <h3>{data.length} Likes</h3>
                      </>
                    ) : (
                      <Icon
                        className="icon"
                        icon="mdi:heart-outline"
                        width={25}
                        height={25}
                        color={"black"}
                      />
                    )}
                  </div>
                  <div className="item-comment">
                    <Icon
                      className="icon"
                      icon="mdi:share"
                      width={30}
                      height={30}
                    />
                    <h3>Share</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Comments;
