import React, { useState } from 'react'
import './dashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Backdrop from './Backdrop';

const Dashboard = () => {

  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () =>{
    setSidebar(!sidebar)
  }
  return (
   <>
    <Toolbar openSidebar={toggleSidebar}/>
    <Backdrop sidebar={sidebar} closeSidebar={toggleSidebar}/>
    <Sidebar sidebar={sidebar}/>
    </>
  )
  }
export default Dashboard
