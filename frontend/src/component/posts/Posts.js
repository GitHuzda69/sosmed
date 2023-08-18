import React, { useState, useRef, useEffect } from "react";
import profilimage from "../../assets/profil.jpg";
import { Icon } from "@iconify/react";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ author: "", content: "" });
  const [textareaHeight] = useState("auto");
  const [maxTextareaHeight] = useState("45px");
  const textareaRef = useRef(null);
  const [likeStatus, setLikeStatus] = useState({});
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [commentAuthor, setCommentAuthor] = useState({});
  const [showCommentInput, setShowCommentInput] = useState({});
  const [activePostId, setActivePostId] = useState(null);
  const [lastClickedPostId, setLastClickedPostId] = useState(null);

  const handleTextareaChange = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    if (textarea.scrollHeight > parseInt(maxTextareaHeight)) {
      textarea.style.overflowY = "scroll";
      textarea.style.height = maxTextareaHeight;
    } else {
      textarea.style.overflowY = "hidden";
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPost.author && newPost.content) {
      let updatedPosts = [...posts];
      {
        const newPostWithId = {
          ...newPost,
          id: Date.now(),
          likes: 0,
          comments: [],
        };
        updatedPosts.push(newPostWithId);
      }
      setPosts(updatedPosts);
      setNewPost({ author: "", content: "" });
    }
  };
  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          const newLikes =
            post.likes === 0 ? 1 : post.likes === 1 ? 0 : post.likes;
          const newStatus = { ...likeStatus };
          newStatus[id] = newLikes > 0;
          setLikeStatus(newStatus);
          if (!comments[id]) {
            setComments((prevComments) => ({
              ...prevComments,
              [id]: [],
            }));
          }
          return { ...post, likes: newLikes };
        }
        return post;
      })
    );
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.width = "1000px";
    textarea.style.width = textarea.scrollWidth + "px";
  }, [newPost.content]);

  const getContentFontSizeClass = (content) => {
    if (content.length > 400) {
      return "small-font";
    } else if (content.length > 200) {
      return "medium-font";
    }
    return "";
  };

  return (
    <div className="posts-main">
      <div className="posts-list">
        {posts.map((post) => (
          <div className="posts" key={post.id}>
            <div className="post-avatar">
              <img src={profilimage} alt="Avatar" />
            </div>
            <div className="posts-container">
              <div className="posts-content">
                <h2>{post.author}</h2>
                <p className={getContentFontSizeClass(post.content)}>
                  {post.content}
                </p>
              </div>
              <div className="button">
                <div className="likes-container">
                  <div
                    className={`likes ${likeStatus[post.id] ? "clicked" : ""}`}
                  >
                    <button onClick={() => handleLike(post.id)}>
                      <Icon
                        icon={
                          likeStatus[post.id]
                            ? "mdi:heart"
                            : "mdi:heart-outline"
                        }
                        width={20}
                        height={20}
                        color={likeStatus[post.id] ? "red" : "black"}
                        style={{
                          marginLeft: "-5px",
                          marginRight: "-5px",
                        }}
                      />
                    </button>
                    <span>{post.likes} Likes</span>
                  </div>
                  <div className="comment-button">
                    <button
                      onClick={() => {
                        setActivePostId(post.id);
                        setShowCommentInput((prevShowInput) => ({
                          ...prevShowInput,
                          [post.id]: !prevShowInput[post.id],
                        }));
                        setLastClickedPostId(post.id);
                        if (!comments[post.id]) {
                          setComments((prevComments) => ({
                            ...prevComments,
                            [post.id]: [],
                          }));
                        }
                      }}
                    >
                      <Icon
                        icon="majesticons:comment-line"
                        width={20}
                        height={20}
                        color="black"
                        style={{
                          marginLeft: "-5px",
                          marginRight: "-5px",
                        }}
                      />
                    </button>
                    <span>Comments</span>
                  </div>
                  <div className="Shares">
                    <button>
                      <Icon
                        icon="majesticons:share-line"
                        width={22}
                        height={22}
                        color="black"
                        style={{
                          marginLeft: "-5px",
                          marginRight: "-5px",
                        }}
                      />
                    </button>
                    <span>Shares</span>
                  </div>
                </div>
              </div>

              {activePostId === post.id && showCommentInput[post.id] && (
                <div className="comment-form">
                  <textarea
                    className="comment-input"
                    placeholder="Write a comment..."
                    value={commentInput[post.id] || ""}
                    onChange={(e) =>
                      setCommentInput((prevInput) => ({
                        ...prevInput,
                        [post.id]: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    className="comment-author-input"
                    placeholder="Your Name"
                    value={commentAuthor[post.id] || ""}
                    onChange={(e) =>
                      setCommentAuthor((prevAuthor) => ({
                        ...prevAuthor,
                        [post.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="comment-send-button"
                    onClick={() => {
                      if (commentInput[post.id] && commentAuthor[post.id]) {
                        setComments((prevComments) => ({
                          ...prevComments,
                          [post.id]: [
                            ...prevComments[post.id],
                            {
                              id: Date.now(),
                              text: commentInput[post.id],
                              author: commentAuthor[post.id],
                            },
                          ],
                        }));
                        setCommentInput((prevInput) => ({
                          ...prevInput,
                          [post.id]: "",
                        }));
                        setShowCommentInput((prevShowInput) => ({
                          ...prevShowInput,
                          [post.id]: false,
                        }));
                        setCommentAuthor((prevAuthor) => ({
                          ...prevAuthor,
                          [post.id]: "",
                        }));
                      }
                    }}
                  >
                    <Icon icon="fluent:send-28-filled" height={15} width={15} />
                  </button>
                  <button
                    className="comment-cancel-button"
                    onClick={() => {
                      setShowCommentInput(false);
                      setCommentInput((prevInput) => ({
                        ...prevInput,
                        [post.id]: "",
                      }));
                      setCommentAuthor((prevAuthor) => ({
                        ...prevAuthor,
                        [post.id]: "",
                      }));
                    }}
                  >
                    <Icon icon="mdi:cancel-bold" height={15} width={15} />
                  </button>
                </div>
              )}
            </div>
            {lastClickedPostId === post.id && (
              <div className="comment-section">
                <h4>Comments</h4>
                <div
                  className="comment-list"
                  style={{ maxHeight: "350px", overflowY: "auto" }}
                >
                  {comments[post.id]?.map((comment) => (
                    <div key={comment.id} className="comment-content">
                      <h5>{comment.author}</h5>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="posts-form">
        <form onSubmit={handleSubmit}>
          <div className="avatar-posts">
            <img src={profilimage} alt="Avatar" />
          </div>
          <textarea
            className="content"
            ref={textareaRef}
            name="content"
            placeholder="What's on your mind?"
            value={newPost.content}
            onChange={handleInputChange}
            onInput={handleTextareaChange}
            style={{ height: textareaHeight, maxHeight: maxTextareaHeight }}
          />
          <button className="post-button" type="submit">
            <Icon icon="fluent:send-28-filled" height={25} width={25} />
          </button>
          <input
            className="author"
            type="text"
            name="author"
            placeholder="Your Name"
            value={newPost.author}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
};

export default Posts;
