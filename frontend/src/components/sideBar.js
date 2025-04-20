import React from "react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { FaFileUpload } from "react-icons/fa";

// import TrafficLogo from "../assets/images/trafficLogo.png";
// import UploadIcon from "../assets/svg/uploadIcon.svg";
// import GuideIcon from "../assets/images/manual-book.png";
// import FineIcon from "../assets/images/fine.png";
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

  return (
    <div className='sidebar-container d-flex-jsb d-flex-col'>
      <div className='sidebar-header d-flex-full gap-8'>
        <GrUserWorker />
        <span>Migrant Work Connect</span>
      </div>
      <div className='sidebar-body p-16'>
        {roleofuser == "employee" && (
          <>
            <div className='sidebar-body-item d-flex gap-8'>
              <MdWork />

              <Link to='/user/jobs'>Jobs</Link>
            </div>
            <div className='sidebar-body-item d-flex gap-8'>
              <MdWork />

              <Link to='/user/minijobs'>Mini Jobs</Link>
            </div>
            <div className='sidebar-body-item d-flex gap-8'>
              <FaFileUpload />
              <Link to='/user/post-minijobs'>Post Mini Jobs</Link>
            </div>
            <div className='sidebar-body-item d-flex gap-8'>
              <MdWorkHistory />
              <Link to='/user/jobs-applied-user'>Jobs Applied by me</Link>
            </div>
          </>
        )}

        {roleofuser != "employee" && (
          <>
            <div className='sidebar-body-item d-flex gap-8'>
              <FaFileUpload />
              <Link to='/company/postjobs'>Post Job</Link>
            </div>

            <div className='sidebar-body-item d-flex gap-8'>
              <MdWorkHistory />
              <Link to='/company/jobs-applied'>Jobs Applied</Link>
            </div>
            <div className='sidebar-body-item d-flex gap-8'>
              <FaFileUpload />
              <Link to='/company/selected'>Selected Candidates</Link>
            </div>
          </>
        )}
      </div>
      <div className='sidebar-footer d-flex-full p-16'>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Sidebar;
