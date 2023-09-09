import { useState } from "react";
import "./Update.css";
import { makeRequest } from "../../axios";

const Update = () => {
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
    const handleClick = (e) => {
        setTexts((prev) => ({...prev, [e.target.name]: [e.target.value] }));
    };

    return (
    <div className="">Update
    <form>
        <input type="file" />
        <input type="file" />
        <input type="text" name="name" onChange={handleChange}/>
        <input type="text" name="city" onChange={handleChange}/>
    </form>
    <button onClick={handleClick}>Save</button>
    </div>
    )
}

export default Update