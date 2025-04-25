import React from "react";
import "../styles/jobs.css";
import { FaMapMarkerAlt, FaDollarSign, FaRegClipboard } from "react-icons/fa"; // Icons for location, salary, and description
import Cookies from "js-cookie"; // To access the logged-in user's role

const MiniJobs = () => {
  const jobData = localStorage.getItem("minitaskData");
  const parsedJobData = jobData ? JSON.parse(jobData) : [];

  const userRole = Cookies.get("role"); // Assuming role is saved in cookies
  const userId = Cookies.get("userId"); // Assuming userId is saved in cookies to identify the logged-in user

  if (parsedJobData.length === 0) {
    return <div className='no-data-message'>No mini jobs available.</div>;
  }

  return (
    <div className='jobs-main-container'>
      {parsedJobData.map((val, key) => (
        <div className='jobs-container' key={key}>
          <div className='jobs-container-content'>
            <h2>{val?.title}</h2>
            <div className='job-detail'>
              <div className='job-detail-item'>
                <FaMapMarkerAlt className='job-icon' />
                <p>{val?.location}</p>
              </div>
              <div className='job-detail-item'>
                <FaDollarSign className='job-icon' />
                <p>{val?.salary}</p>
              </div>
              <div className='job-detail-item'>
                <FaRegClipboard className='job-icon' />
                <p>{val?.requirements}</p>
              </div>
            </div>
            <span>{val?.description}</span>

            {/* Apply Button Logic: Show Apply button only if the current user is not the job poster */}
            {userRole === "employee" && val?.posterId !== userId && (
              <button className='apply-button'>Apply</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniJobs;
