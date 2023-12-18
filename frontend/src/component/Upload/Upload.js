import "./Upload.css";
import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { makeRequest, makeAxios } from "../../fetch.js";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const fileInputRef = useRef(null);
  const desc = useRef();
  const { user: currentUser } = useContext(AuthContext);
  const [showFileInput, setShowFileInput] = useState(false);
  const [audioRecording, setAudioRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);

  const { user } = useContext(AuthContext);

  //SOCKET IO
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/gif")
    ) {
      setFile(selectedFile);
    } else {
      alert("Only images (JPEG, PNG) and GIFs are allowed.");
    }
  };

  const clearSelectedFile = () => {
    setFile(null);
  };

  // BASE 64 SYSTEM
  const convertbase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const convertAudio64 = (audio) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(audio);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!desc.current.value.trim() && !file) {
      return;
    }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const res = await convertbase64(file);
      newPost.img = res;
    }

    if (audio) {
      const res = await convertAudio64(audio);
      newPost.file = res;
    }

    socket.current.emit("uploadPostFollow", {
      userId: currentUser._id,
      desc: newPost.desc,
      img: newPost.img,
      file: newPost.file,
    });

    try {
      await makeRequest("posts", "POST", newPost);
      desc.current.value = null;
      setAudio(null);
      setFile(null);
    } catch (err) {
      console.error("Error creating post:", err.message);
    }
  };

  const handleMediaButtonClick = () => {
    setShowFileInput(!showFileInput);
    if (!showFileInput && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleClick(e);
    } else if (e.key === "Enter" && e.shiftKey) {
      const descElement = desc.current;
      const startPos = descElement.selectionStart;
      const endPos = descElement.selectionEnd;
      const text = descElement.value;
      const newText =
        text.substring(0, startPos) +
        "\n" +
        text.substring(endPos, text.length);

      descElement.value = newText;
      descElement.setSelectionRange(startPos + 1, startPos + 1);
    }
    handleAutoHeight();
  };

  const handleAutoHeight = () => {
    const textarea = desc.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
          const audioBlob = e.data;
          const audioUrl = URL.createObjectURL(audioBlob);
          audioBlob.name = `audio-${Date.now()}.mp3`;
          setAudioRecording(audioUrl);
          setAudio(audioBlob);
        };
        recorder.start();
        setIsRecording(true);
        mediaRecorder.current = recorder;
      })
      .catch((err) => console.error("Error accessing microphone:", err));
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceButtonClick = () => {
    if (!isRecording) {
      startRecording();
      setIsRecording(true);
    } else {
      stopRecording();
      setIsRecording(false);
    }
  };

  const handleCloseAudio = () => {
    setAudioRecording(null);
    setFile(null);
  };
  return (
    <div className="upload">
      <div className="selected-file-container">
        {file && !audioRecording && (
          <div className="selected-file-info">
            <img
              className="selected-image"
              src={URL.createObjectURL(file)}
              alt="Selected"
            />
            <span className="file-name">{file.name}</span>
            <button className="clear-file-button" onClick={clearSelectedFile}>
              <Icon icon="ph:x-bold" color="white" width={15} height={15} />
            </button>
          </div>
        )}
      </div>
      <div className="input-post">
        <textarea
          type="text"
          placeholder={"What's in your mind " + user.username + "?"}
          ref={desc}
          onKeyDown={handleEnterKey}
        />
        {audioRecording && (
          <div className="audio-controls">
            <audio controls src={audioRecording} />
            <button className="close-audio" onClick={handleCloseAudio}>
              Close
            </button>
          </div>
        )}
      </div>
      <div className="button-upload">
        <div className="uploadItem-row">
          <button className="uploadItem">
            <Icon
              icon="fluent:emoji-laugh-24-regular"
              width={25}
              height={25}
            ></Icon>
          </button>
          <button
            className="uploadItem"
            onClick={handleMediaButtonClick}
            type="file"
            id="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setFile(e.target.files[0])}
          >
            <Icon
              icon="material-symbols:perm-media-outline"
              width={25}
              height={25}
            ></Icon>
          </button>
          <button className="uploadItem">
            <Icon icon="fluent:gif-16-regular" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem" onClick={handleVoiceButtonClick}>
            {isRecording ? (
              <Icon icon="icon-park-twotone:voice" width={25} height={25} />
            ) : (
              <Icon icon="icon-park-outline:voice" width={25} height={25} />
            )}
          </button>
        </div>
        <button className="uploadButton" onClick={handleClick}>
          Post
        </button>
      </div>
      <input
        className="uploadItem-popup"
        type="file"
        id="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".png,.jpeg,.jpg,.gif"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Upload;
