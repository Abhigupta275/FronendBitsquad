import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import './sidebar.css'

const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "",
      name: "",
      icon: <FaUserAlt />,
    },
    {
      path: "",
      name: "Dashboard",
      icon: <FaTh />,
    },
   
    {
      path: "invoice",
      name: "Invoice",
      icon: <FaThList />,
    },
  ];
  return (
    <div className="main-container">
    <Navbar />
    <div className="container">
    <div className="row">

        <div className= {isOpen ? "col-2" : ""}>
        
        
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
            <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Bitsquad
            </h1>
            <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
            </div>
            </div>
            {menuItem.map((item, index) => (
              <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
              >
              <div className="icon">{item.icon}</div>
              <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
              > 
              {item.name}
              </div>
              </NavLink>
              ))}
              </div>
            
          </div>
            
            
          <div className={isOpen ? "col-10" : "col-12"}>
          
            <main className="content">{children}
              <Outlet />
            </main>
          
          </div>
      
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
