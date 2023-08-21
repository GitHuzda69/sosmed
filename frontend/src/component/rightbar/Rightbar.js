import "./Rightbar.css";
import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";


const Rightbar = () => {
    return (
        <div className="rightBar">
            <div className="rightBarContainer">
                <div className="rightBarItem">
                    <span>Friends</span>
                    <div className="rightBarUser">
                        <div className="rightBarUserInfo">
                            <img className="rightBarImg" src={avatar1} />
                            <p className="rightBarUserStatus">
                            <span className="rightBarName">John Doe</span>
                            Online
                            </p>
                        </div>
                        <div className="rightBarButtons">
                            <button  className="rightBarButton">Icon</button>
                        </div>
                    </div>
                    <div className="rightBarUser">
                        <div className="rightBarUserInfo">
                            <img src={avatar2} className="rightBarImg" />
                            <p className="rightBarUserStatus">
                            <span className="rightBarName">James Smith</span>
                            Online 12 Minutes Ago
                            </p>
                        </div>
                        <div className="rightBarButtons">
                            <button  className="rightBarButton">Icon</button>
                        </div>
                    </div>
                    <div className="rightBarUser">
                        <div className="rightBarUserInfo">
                            <img src={avatar3} className="rightBarImg" />
                            <p className="rightBarUserStatus">
                            <span className="rightBarName">Michael Jackson</span>
                            Online 30 Minutes Ago
                            </p>
                        </div>
                        <div className="buttons">
                            <button  className="rightBarButton">Icon</button>
                        </div>
                    </div>
                    <div className="rightBarUser">
                        <div className="rightBarUserInfo">
                            <img src={avatar3} className="rightBarImg" />
                            <p className="rightBarUserStatus">
                            <span className="rightBarName">Yessa Pamungkas</span>
                            Online 2 Hours Ago
                            </p>
                        </div>
                        <div className="rightBarButtons">
                            <button  className="rightBarButton">Icon</button>
                        </div>
                    </div>
                    <div className="rightBarUser">
                        <div className="rightBarUserInfo">
                            <img src={avatar5} className="rightBarImg" />
                            <p className="rightBarUserStatus">
                            <span  className="rightBarName">Yessa Pangestu</span>
                            Online 3 Days Ago
                            </p>
                        </div>
                        <div className="rightBarButtons">
                            <button className="rightBarButton">Icon</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Rightbar