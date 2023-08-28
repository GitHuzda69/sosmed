import "./Upload.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [decs, setDecs] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const upload = async ()=>{
    try{
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post('/upload', formData)
      return res.data
  }catch(err){
    console.log(err)
  }}

  const { currentUser } = useContext(AuthContext);

  const queryClient = new QueryClient();

  const mutation = useMutation((newPost) =>{
    return makeRequest.post("/posts", newPost);
  },{
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    }
  })

  const handleMediaButtonClick = () => {
    setShowFileInput(!showFileInput);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({decs, img: imgUrl })
  };
  return (
    <div className="upload">
      <div className="input-post">
        <textarea
          type="text"
          placeholder={`Tuliskan sesuatu ${currentUser.username}`}
          onChange={(e) => setDecs(e.target.value)}
        />
      </div>
      <div className="button-upload">
        <div className="uploadItem-row">
          <button className="uploadItem">
            <Icon icon="ic:outline-poll" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem">
            <Icon icon="fluent:gif-16-regular" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem" onClick={handleMediaButtonClick}>
            <Icon
              icon="material-symbols:perm-media-outline"
              width={25}
              height={25}
            ></Icon>
          </button>
        </div>
        <button className="uploadButton" onClick={handleClick}>
          Post
        </button>
      </div>
      {showFileInput && (
        <input
          className="uploadItem-popup"
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      )}
    </div>
  );
};

export default Upload;
