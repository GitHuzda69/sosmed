import { useContext, useState } from "react";
import "./Update.css";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const Update = (userdata) => {
    const navigate = useNavigate();
    const { currnrUser} = useContext(AuthContext)
    const [cover, setCover] = useState(null)
    const [profile, setprofile] = useState(null)
    const [texts, setTexts] = useState({
        name:"",
        city:"",
    })

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData)
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setTexts((prev) => ({...prev, [e.target.name]: [e.target.value] }));
    };

    const queryClient = useQueryClient();
    const mutation = useMutation((user) => {
        return makeRequest.put("/users", user);
    },{
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        let coverUrl;
        let profileUrl;

        coverUrl = cover ? await upload(cover) : userdata.coverpic
        profileUrl = profile ? await upload(profile) : userdata.profilepic

        mutation.mutate({ ...texts, coverpic: coverUrl, profilepic: profileUrl });
        navigate(`/profile/${currnrUser.id}`)
    };

    return (
    <div className="">Update
    <form>
        <input type="file" onChange={e=>setCover(e.target.files[0])} />
        <input type="file" onChange={e=>setprofile(e.target.files[0])} />
        <input type="text" name="name" onChange={handleChange}/>
        <input type="text" name="city" onChange={handleChange}/>
    </form>
    <button onClick={handleSubmit}>Save</button>
    </div>
    )
}

export default Update