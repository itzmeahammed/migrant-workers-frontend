import React, { useState } from "react";
import "../styles/postjob.css";
import { POST_JOB_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import SuccessLoader from "./sucessLoader";

const PostJobMiniJobs = () => {
  const token = Cookies.get("token");
  const [isSubmitted, setisSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let overAllData = [];
    const prevData = localStorage.getItem("minitaskData");
    if (prevData) {
      const parsedData = JSON.parse(prevData);

      overAllData.push(parsedData?.flat());
      overAllData.push(formData);
    } else {
      overAllData.push(formData);
    }
    localStorage.setItem("minitaskData", JSON.stringify(overAllData));
    setFormData({
      title: "",
      contact: "",
      description: "",
      location: "",
      salary: "",
    });
  };

  return (
    <>
      <SuccessLoader open={isSubmitted} setopen={setisSubmitted} />
      <form className='post-job' onSubmit={handleSubmit}>
        <h2>Post a Mini Job</h2>
        <input
          type='text'
          name='title'
          placeholder='Job Title'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='contact'
          placeholder='contact'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='location'
          placeholder='Location'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='salary'
          placeholder='Salary'
          required
          onChange={handleChange}
        />
        <textarea
          name='description'
          placeholder='Job Description'
          required
          onChange={handleChange}
        />

        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default PostJobMiniJobs;
