import React, { useState } from "react";
import "./dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Toolbar({openSidebar}) {
  return (
    <div>
      <div className="tool-bar">
        <div className="burger" onClick={openSidebar}>
          <h4 className="bi bi-list"></h4>
        </div>
        <h6 className="title">Bitsquad</h6>
      </div>
    </div>
  );
}

export default Toolbar;
