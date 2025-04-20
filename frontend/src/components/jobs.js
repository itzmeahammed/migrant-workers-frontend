import React, { useEffect, useState } from "react";
import "../styles/jobs.css";
import ApplyJobPopUp from "./applyJobPopUp";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { GET_ALL_JOBS } from "../helper/apiurls";
import LoaderPopup from "./loader";

const Jobs = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [jobData, setjobData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const fetchAllJobs = async () => {
    setisLoading(true);
    try {
      const response = await fetch(GET_ALL_JOBS, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setjobData(data);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      return [];
    }
    setisLoading(false);
  };
  useEffect(() => {
    fetchAllJobs();
  }, []);

  const [open, setopen] = useState({
    ispoen: false,
    data: {},
  });

  return (
    <>
      {isLoading && <LoaderPopup />}

      <div className='jobs-main-container d-flex gap-16'>
        <ApplyJobPopUp open={open} setopen={setopen} />
        {jobData?.map((val, key) => (
          <div className='jobs-container d-flex-col d-flex-jsb' key={key}>
            {/* <img src={val?.img} alt='' width={250} height={250} /> */}
            <div className='jobs-container-content d-flex-col gap-8'>
              <h2>{val?.title}</h2>
              <p>{val?.location}</p>
              <p>{val?.salary}</p>
              <p>{val?.requirements}</p>

              <span>{val?.description} </span>
            </div>
            <button
              className='apply-job-btn'
              onClick={() => setopen({ isopen: true, data: val })}
            >
              Apply Job
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Jobs;
