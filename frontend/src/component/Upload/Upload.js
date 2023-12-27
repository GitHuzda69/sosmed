import "./Upload.css";
import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import { makeRequest, makeAxios } from "../../fetch.js";
import { useNavigate } from "react-router";

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
  const [recordingText, setRecordingText] = useState("Recording");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png" || selectedFile.type === "image/gif")) {
      setFile(selectedFile);
    } else {
      alert("Only images (JPEG, PNG) and GIFs are allowed.");
    }
  };

  const clearSelectedFile = () => {
    setFile(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!desc.current.value.trim() && !audio && !file) {
      return;
    }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        await makeAxios.post("/upload", data);
      } catch (err) {
        // Handle error
        console.error("Error uploading file:", err.message);
      }
    }

    if (audio) {
      const data = new FormData();
      const audioName = Date.now() + audio.name;
      data.append("name", audioName);
      data.append("file", audio);
      newPost.file = audioName;

      try {
        await makeAxios.post("/upload", data);
      } catch (err) {
        // Handle error
        console.error("Error uploading file:", err.message);
      }
    }

    try {
      await makeRequest("posts", "POST", newPost);
      desc.current.value = null;
      setAudio(null);
      setFile(null);
      setAudioRecording(null);
    } catch (err) {
      console.error("Error creating post:", err.message);
    }
  };

  const handleMediaButtonClick = () => {
    if (audioRecording) {
      return;
    }
    if (isRecording) {
      return;
    }
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
      const newText = text.substring(0, startPos) + "\n" + text.substring(endPos, text.length);

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

        if (recorder) {
          recorder.start();
          setIsRecording(true);
          mediaRecorder.current = recorder;

          const startTime = Date.now();
          const updateDuration = () => {
            const seconds = Math.floor((Date.now() - startTime) / 1000);
            setRecordingDuration(formatDuration(seconds));
          };

          updateDuration();

          const intervalId = setInterval(updateDuration, 1000);

          if (mediaRecorder.current) {
            mediaRecorder.current.onstop = () => {
              setIsRecording(false);
              clearInterval(intervalId);
            };
          }
        }
      })
      .catch((err) => console.error("Error accessing microphone:", err));
  };

  const formatDuration = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceButtonClick = () => {
    if (file) {
      return;
    }
    if (audioRecording) {
      setAudioRecording(null);
      startRecording();
      setIsRecording(true);
      return;
    }
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

  const CustomAudioControls = ({ audioRecording, onCloseAudio, onStartRecording }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handlePlayPause = () => {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    const handleMute = () => {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audioRef.current.duration);
    };

    const formatTime = (timeInSeconds) => {
      const remainingTime = Math.max(duration - timeInSeconds, 0);
      const minutes = Math.floor(remainingTime / 60);
      const seconds = Math.floor(remainingTime % 60);
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const handleRestartRecording = () => {
      onCloseAudio();
      onStartRecording();
    };

    useEffect(() => {
      const audioElement = audioRef.current;

      audioElement.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("durationchange", handleDurationChange);

      return () => {
        audioElement.removeEventListener("ended", () => {
          setIsPlaying(false);
          setCurrentTime(0);
        });
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("durationchange", handleDurationChange);
      };
    }, []);

    return (
      <div className="audio-controls">
        <audio ref={audioRef} src={audioRecording} />
        <div className="custom-audio-buttons">
          <button className="play-pause-button" onClick={handlePlayPause}>
            {isPlaying ? <Icon icon="mingcute:pause-fill" width={20} height={20} /> : <Icon icon="mingcute:play-fill" width={20} height={20} />}
          </button>
          <div className="duration-slider">
            <input type="range" value={currentTime} max={duration || 0} step="1" onChange={(e) => (audioRef.current.currentTime = e.target.value)} />
          </div>
          <div className="time-display">{`${formatTime(duration - currentTime)} /${formatTime(currentTime)}`}</div>
          <button className="mute-button" onClick={handleMute}>
            {isMuted ? <Icon icon="fluent:speaker-0-16-filled" width={20} height={20} /> : <Icon icon="fluent:speaker-2-16-filled" width={20} height={20} />}
          </button>
          <button className="close-audio" onClick={onCloseAudio}>
            <Icon icon="material-symbols-light:delete-outline" width={25} height={25} />
          </button>
          <button className="restart-recording" onClick={handleRestartRecording}>
            <Icon icon="tabler:reload" width={20} height={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="upload">
      <div className="selected-file-container">
        {file && !audioRecording && (
          <div className="selected-file-info">
            <img className="selected-image" src={URL.createObjectURL(file)} alt="Selected" />
            <span className="file-name">{file.name}</span>
            <button className="clear-file-button" onClick={clearSelectedFile}>
              <Icon icon="ph:x-bold" color="white" width={15} height={15} />
            </button>
          </div>
        )}
      </div>
      <div className="input-post">
        <textarea style={{ fontFamily: "Inter", fontSize: "18px" }} type="text" placeholder={"What's in your mind " + user.username + "?"} ref={desc} onKeyDown={handleEnterKey} />
      </div>
      <div className="button-upload">
        <div className="uploadItem-row">
          <button className="uploadItem">
            <Icon icon="fluent:emoji-laugh-24-regular" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem" onClick={handleMediaButtonClick} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])}>
            <Icon icon="material-symbols:perm-media-outline" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem">
            <Icon icon="fluent:gif-16-regular" width={25} height={25}></Icon>
          </button>
          <button className="uploadItem" onClick={handleVoiceButtonClick}>
            {isRecording ? (
              <div className="recording-voice">
                <Icon icon="icon-park-outline:voice" width={25} height={25} color="red" />
                <Icon icon="radix-icons:dot-filled" width={20} height={20} color="red" />
                <p>Recording </p>
                <span>({recordingDuration})</span>
              </div>
            ) : (
              <Icon icon="icon-park-outline:voice" width={25} height={25} />
            )}
          </button>
        </div>
        {!isRecording && (
          <button className="uploadButton" onClick={handleClick}>
            Post
          </button>
        )}
      </div>
      {audioRecording && <CustomAudioControls audioRecording={audioRecording} onCloseAudio={handleCloseAudio} onStartRecording={startRecording} />}
      <input className="uploadItem-popup" type="file" id="file" ref={fileInputRef} onChange={handleFileInputChange} accept=".png,.jpeg,.jpg,.gif" style={{ display: "none" }} />
    </div>
  );
};

export default Upload;
