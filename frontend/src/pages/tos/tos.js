import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import "./tos.css";

const TermsOfService = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="terms-container">
      <div className="terms-of-service">
        <button className="back-terms" onClick={handleGoBack}>
          <Icon icon="ion:arrow-back" width={30} height={30} />
        </button>
        <h1>Website Terms and Conditions of Use</h1>
        <h2>1. Terms</h2>
        <p>
          By accessing this Website, accessible from smd.com, you are agreeing
          to be bound by these Website Terms and Conditions of Use and agree
          that you are responsible for the agreement with any applicable local
          laws. If you disagree with any of these terms, you are prohibited from
          accessing this site. The materials contained in this Website are
          protected by copyright and trade mark law.
        </p>
        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the
          materials on SMD's Website for personal, non-commercial transitory
          viewing only. This is the grant of a license, not a transfer of title,
          and under this license you may not: modify or copy the materials; use
          the materials for any commercial purpose or for any public display;
          attempt to reverse engineer any software contained on SMD's Website;
          remove any copyright or other proprietary notations from the
          materials; or transferring the materials to another person or "mirror"
          the materials on any other server. This will let SMD to terminate upon
          violations of any of these restrictions. Upon termination, your
          viewing right will also be terminated and you should destroy any
          downloaded materials in your possession whether it is printed or
          electronic format. These Terms of Service has been created with the
          help of the Terms Of Service Generator.
        </p>
        <h2>3. Disclaimer</h2>
        <p>
          All the materials on SMD's Website are provided "as is". SMD makes no
          warranties, may it be expressed or implied, therefore negates all
          other warranties. Furthermore, SMD does not make any representations
          concerning the accuracy or reliability of the use of the materials on
          its Website or otherwise relating to such materials or any sites
          linked to this Website.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
