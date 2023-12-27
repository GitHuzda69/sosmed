import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import "./tos.css";

function TermsOfService() {
  const [showAbout, setShowAbout] = useState(false);
  const [showTos, setShowTos] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCopyright, setShowCopyright] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const toggleSection = (section) => {
    switch (section) {
      case "about":
        setShowAbout(!showAbout);
        break;
      case "tos":
        setShowTos(!showTos);
        break;
      case "privacy":
        setShowPrivacy(!showPrivacy);
        break;
      case "copyright":
        setShowCopyright(!showCopyright);
        break;
      default:
        break;
    }
    document.querySelectorAll(`.${section}-container`).forEach((container) => {
      container.classList.toggle("closed");
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);

    setDarkMode(storedDarkModeStatus);
  }, []);

  const setDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "app"}>
      <div className="main-tos">
        <div className="tos-main">
          <div className="tos-border">
            <button onClick={handleGoBack} className="back-tos-button">
              <Icon icon="ion:arrow-back-outline" width={25} height={25} />
            </button>
            <div className="tos-buttons">
              <button onClick={() => toggleSection("about")} className={`tos-button ${showAbout ? "bold-tos-button" : ""}`}>
                1. About
              </button>
              <button onClick={() => toggleSection("tos")} className={`tos-button ${showTos ? "bold-tos-button" : ""}`}>
                2. Terms Of Services
              </button>
              <button onClick={() => toggleSection("privacy")} className={`tos-button ${showPrivacy ? "bold-tos-button" : ""}`}>
                3. Privacy
              </button>
              <button onClick={() => toggleSection("copyright")} className={`tos-button ${showCopyright ? "bold-tos-button" : ""}`}>
                4. Copyright
              </button>
            </div>
          </div>
          <div className="tos-content">
            <div className={`about-container ${showAbout ? "" : "closed"}`}>
              <h2>Sync, Manage and Direct</h2>
              <button className="showTosButton" onClick={() => toggleSection("about")}>
                {showAbout ? <Icon icon="mingcute:down-line" width={30} height={30} /> : <Icon icon="mingcute:up-line" width={30} height={30} />}
              </button>
              {showAbout && (
                <>
                  <p>
                    By accessing this Website, accessible from smd.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement
                    with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by
                    copyright and trade mark law.
                  </p>
                  <p>
                    Permission is granted to temporarily download one copy of the materials on SMD's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                    transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse
                    engineer any software contained on SMD's Website; remove any copyright or other proprietary notations from the materials; or transferring the materials to another person or
                    "mirror" the materials on any other server. This will let SMD to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be
                    terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. These Terms of Service has been created with the help of
                    the Terms Of Service Generator.
                  </p>
                  <p>
                    All the materials on SMD's Website are provided "as is". SMD makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, SMD does not
                    make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this
                    Website. SMD or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on SMD's Website, even if SMD or an
                    authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties
                    or limitations of liability for incidental damages, these limitations may not apply to you.
                  </p>
                  <p>
                    The materials appearing on SMD's Website may include technical, typographical, or photographic errors. SMD will not promise that any of the materials in this Website are accurate,
                    complete, or current. SMD may change the materials contained on its Website at any time without notice. SMD does not make any commitment to update the materials.
                  </p>
                </>
              )}
            </div>
            <div className={`tos-container ${showTos ? "" : "closed"}`}>
              <h2>Terms Of Services</h2>
              <button className="showTosButton" onClick={() => toggleSection("tos")}>
                {showTos ? <Icon icon="mingcute:down-line" width={30} height={30} /> : <Icon icon="mingcute:up-line" width={30} height={30} />}
              </button>
              {showTos && (
                <>
                  <h3>1. Terms</h3>
                  <p>
                    By accessing this Website, accessible from smd.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement
                    with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by
                    copyright and trade mark law.
                  </p>
                  <h3>2. Use License</h3>
                  <p>
                    Permission is granted to temporarily download one copy of the materials on SMD's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                    transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse
                    engineer any software contained on SMD's Website; remove any copyright or other proprietary notations from the materials; or transferring the materials to another person or
                    "mirror" the materials on any other server. This will let SMD to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be
                    terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. These Terms of Service has been created with the help of
                    the Terms Of Service Generator.
                  </p>
                  <h3>3. Disclaimer</h3>
                  <p>
                    All the materials on SMD's Website are provided "as is". SMD makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, SMD does not
                    make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this
                    Website. SMD or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on SMD's Website, even if SMD or an
                    authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties
                    or limitations of liability for incidental damages, these limitations may not apply to you.
                  </p>
                  <h3>4. Revisions and Errata</h3>
                  <p>
                    The materials appearing on SMD's Website may include technical, typographical, or photographic errors. SMD will not promise that any of the materials in this Website are accurate,
                    complete, or current. SMD may change the materials contained on its Website at any time without notice. SMD does not make any commitment to update the materials.
                  </p>
                </>
              )}
            </div>
            <div className={`privacy-container ${showPrivacy ? "" : "closed"}`}>
              <h2>
                <Icon icon="iconoir:privacy-policy" width={25} height={25} />
                Privacy Policy for SMD
              </h2>
              <button className="showTosButton" onClick={() => toggleSection("privacy")}>
                {showPrivacy ? <Icon icon="mingcute:down-line" width={30} height={30} /> : <Icon icon="mingcute:up-line" width={30} height={30} />}
              </button>
              {showPrivacy && (
                <>
                  <p>
                    At SMD, accessible from SMD, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by
                    SMD and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                  </p>
                  <h3>Log Files </h3>
                  <p>
                    SMD follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The
                    information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly
                    the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site,
                    tracking users' movement on the website, and gathering demographic information. Our Privacy Policy was created with the help of the Privacy Policy Generator.
                  </p>
                  <h3>Cookies and Web Beacons</h3>
                  <p>
                    Like any other website, SMD uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or
                    visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information. Lorem Ipsum dolor
                    sit Amet Consectetur adipiscing elit. Sed tempus pulvinar pretium. Sed ac odio ultricies, vehicula neque vel, congue justo. Integer ante sapien, varius ac rhoncus ut, dapibus a
                    dolor. Donec fringilla, purus at tempor elementum, purus ipsum congue nibh, vitae interdum ipsum diam a nisl. Ut semper euismod turpis, id mattis lacus condimentum et. Proin
                    volutpat, quam eget hendrerit fringilla, tortor nunc volutpat dui, eu commodo felis dui congue erat. Praesent dapibus lorem et quam dapibus ullamcorper.
                  </p>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus pulvinar pretium. Sed ac odio ultricies, vehicula neque vel, congue justo. Integer ante sapien, varius ac
                    rhoncus ut, dapibus a dolor. Donec fringilla, purus at tempor elementum,
                  </span>
                </>
              )}
            </div>
            <div className={`copyright-container ${showCopyright ? "" : "closed"}`}>
              <h2>Copyright</h2>
              <button className="showTosButton" onClick={() => toggleSection("copyright")}>
                {showCopyright ? <Icon icon="mingcute:down-line" width={30} height={30} /> : <Icon icon="mingcute:up-line" width={30} height={30} />}
              </button>
              {showCopyright && (
                <>
                  <h3>1. Terms</h3>
                  <p>
                    By accessing this Website, accessible from smd.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement
                    with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by
                    copyright and trade mark law.
                  </p>
                  <h3>2. Use License</h3>
                  <p>
                    Permission is granted to temporarily download one copy of the materials on SMD's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a
                    transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse
                    engineer any software contained on SMD's Website; remove any copyright or other proprietary notations from the materials; or transferring the materials to another person or
                    "mirror" the materials on any other server. This will let SMD to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be
                    terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. These Terms of Service has been created with the help of
                    the Terms Of Service Generator.
                  </p>
                  <h3>3. Disclaimer</h3>
                  <p>
                    All the materials on SMD's Website are provided "as is". SMD makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, SMD does not
                    make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this
                    Website. SMD or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on SMD's Website, even if SMD or an
                    authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties
                    or limitations of liability for incidental damages, these limitations may not apply to you.
                  </p>
                  <h3>4. Revisions and Errata</h3>
                  <p>
                    The materials appearing on SMD's Website may include technical, typographical, or photographic errors. SMD will not promise that any of the materials in this Website are accurate,
                    complete, or current. SMD may change the materials contained on its Website at any time without notice. SMD does not make any commitment to update the materials.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
