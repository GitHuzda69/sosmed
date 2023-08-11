import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Sidebar from "./component/navbar/Sidebar";
import SearchBar from "./component/search/Search";
import profilimage from "./assets/profil.jpg";
import "./Messages.css";
import "./App.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ author: "", content: "" });
  const [textareaHeight] = useState("auto");
  const [maxTextareaHeight] = useState("50px");
  const textareaRef = useRef(null);
  const [likeStatus, setLikeStatus] = useState({});
  const [selectedCommentPostId, setSelectedCommentPostId] = useState(null);

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
  const handleComment = (postId) => {
    if (selectedCommentPostId === postId) {
      setSelectedCommentPostId(null);
    } else {
      setSelectedCommentPostId(postId);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPost.author && newPost.content) {
      let updatedPosts = [...posts];
      if (selectedCommentPostId !== null) {
        updatedPosts = updatedPosts.map((post) =>
          post.id === selectedCommentPostId
            ? {
                ...post,
                comments: [
                  ...(post.comments || []),
                  {
                    id: Date.now(),
                    author: newPost.author,
                    content: newPost.content,
                  },
                ],
              }
            : post
        );
      } else {
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

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.width = "1000px";
    textarea.style.width = textarea.scrollWidth + "px";
  }, [newPost.content]);

  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          const newLikes =
            post.likes === 0 ? 1 : post.likes === 1 ? 0 : post.likes;
          const newStatus = { ...likeStatus };
          newStatus[id] = newLikes > 0;
          setLikeStatus(newStatus);
          return { ...post, likes: newLikes };
        }
        return post;
      })
    );
  };

  const handleSearch = (searchTerm) => {
    console.log("Pencarian:", searchTerm);
  };

  return (
    <div className="app">
      <Sidebar />
      <SearchBar onSearch={handleSearch} />
      <main className="main">
        <div className="message-form">
          <div className="button-container">
            <button className="button-content">
              <Icon icon="oi:share" width={30} height={30} />
            </button>
            <button className="button-content">
              <Icon icon="ci:download" width={30} height={30} />
            </button>
            <button className="button-content">
              <Icon icon="mdi:heart-outline" width={30} height={30} />
            </button>
            <button className="button-content">
              <Icon icon="ri:share-line" width={30} height={30} />
            </button>
            <button className="button-content">
              <Icon
                icon="radix-icons:dots-vertical"
                rotate={1}
                width={30}
                height={30}
              />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="avatar2">
              <img src={profilimage} alt="Avatar" />
            </div>
            <textarea
              className="content-text"
              ref={textareaRef}
              name="content"
              placeholder={
                selectedCommentPostId !== null
                  ? "Write a comment..."
                  : "What's on your mind?"
              }
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
        <div className="message-list-and-comments">
          <div className="message-list">
            {posts.map((post) => (
              <div className="message" key={post.id}>
                <div className="post-avatar">
                  <img src={profilimage} alt="Avatar" />
                </div>
                <div className="post-container">
                  <div className="post-content">
                    <h2>{post.author}</h2>
                    <p>{post.content}</p>
                  </div>
                  <div className="button">
                    <div className="likes-container">
                      <div
                        className={`likes ${
                          likeStatus[post.id] ? "clicked" : ""
                        }`}
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
                      <div
                        className="comment"
                        onClick={() => handleComment(post.id)}
                      >
                        <button>
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
                </div>
              </div>
            ))}
          </div>
          <div className="comments-section">
            {selectedCommentPostId !== null &&
              posts.map((post) =>
                post.id === selectedCommentPostId ? (
                  <div key={post.id}>
                    {post.comments &&
                      post.comments.map((comment) => (
                        <div className="comment" key={comment.id}>
                          <h2>{comment.author}</h2>
                          <p>{comment.content}</p>
                        </div>
                      ))}
                  </div>
                ) : null
              )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
