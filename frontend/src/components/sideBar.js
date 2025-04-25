import React from "react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { FaFileUpload } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    Cookies.remove("token");
    const token = Cookies.get("token");

    if (!token) navigate("/");
  };

  const roleofuser = Cookies.get("role");
  const currentPath = window.location.pathname; // Get the current path to highlight the active menu

  return (
    <div className='sidebar-container'>
      <div className='sidebar-header'>
        <GrUserWorker className='icon' />
        <span>Migrant Work Connect</span>
      </div>
      <div className='sidebar-body'>
        {roleofuser === "employee" && (
          <>
            <div
              className={`sidebar-body-item ${
                currentPath === "/user/jobs" ? "active" : ""
              }`}
            >
              <MdWork className='sidebar-icon' />
              <Link to='/user/jobs' className='sidebar-link'>
                Jobs
              </Link>
            </div>
            <div
              className={`sidebar-body-item ${
                currentPath === "/user/minijobs" ? "active" : ""
              }`}
            >
              <MdWork className='sidebar-icon' />
              <Link to='/user/minijobs' className='sidebar-link'>
                Mini Jobs
              </Link>
            </div>
            <div
              className={`sidebar-body-item ${
                currentPath === "/user/post-minijobs" ? "active" : ""
              }`}
            >
              <FaFileUpload className='sidebar-icon' />
              <Link to='/user/post-minijobs' className='sidebar-link'>
                Post Mini Jobs
              </Link>
            </div>
            <div
              className={`sidebar-body-item ${
                currentPath === "/user/jobs-applied-user" ? "active" : ""
              }`}
            >
              <MdWorkHistory className='sidebar-icon' />
              <Link to='/user/jobs-applied-user' className='sidebar-link'>
                Jobs Applied by me
              </Link>
            </div>
          </>
        )}

        {roleofuser !== "employee" && (
          <>
            <div
              className={`sidebar-body-item ${
                currentPath === "/company/postjobs" ? "active" : ""
              }`}
            >
              <FaFileUpload className='sidebar-icon' />
              <Link to='/company/postjobs' className='sidebar-link'>
                Post Job
              </Link>
            </div>
            <div
              className={`sidebar-body-item ${
                currentPath === "/company/jobs-applied" ? "active" : ""
              }`}
            >
              <MdWorkHistory className='sidebar-icon' />
              <Link to='/company/jobs-applied' className='sidebar-link'>
                Jobs Applied
              </Link>
            </div>
            <div
              className={`sidebar-body-item ${
                currentPath === "/company/selected" ? "active" : ""
              }`}
            >
              <FaFileUpload className='sidebar-icon' />
              <Link to='/company/selected' className='sidebar-link'>
                Selected Candidates
              </Link>
            </div>
          </>
        )}
      </div>
      <div className='sidebar-footer'>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Sidebar;
