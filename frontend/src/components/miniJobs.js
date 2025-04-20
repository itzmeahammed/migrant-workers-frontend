import React from "react";
import "../styles/jobs.css";

const MiniJobs = () => {
  const jobData = localStorage.getItem("minitaskData");

  const parsedJobData = jobData ? JSON.parse(jobData) : [];

  return (
    <>
      {parsedJobData.map((val, key) => (
        <div className='jobs-container d-flex-col d-flex-jsb' key={key}>
          <div className='jobs-container-content d-flex-col gap-8'>
            <h2>{val?.title}</h2>
            <p>{val?.location}</p>
            <p>{val?.salary}</p>
            <p>{val?.requirements}</p>
            <span>{val?.description}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default MiniJobs;
