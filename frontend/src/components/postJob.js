import React, { useState } from "react";
import "../styles/postjob.css";
import { POST_JOB_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import SuccessLoader from "./sucessLoader";

const PostJob = () => {
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
    try {
      const res = await fetch(POST_JOB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      setisSubmitted(true);
    } catch (err) {
      console.error("Post failed", err);
    }
    setFormData({
      title: "",
      company: "",
      description: "",
      location: "",
      salary: "",
      requirements: "",
    });
  };

  return (
    <>
      <SuccessLoader open={isSubmitted} setopen={setisSubmitted} />
      <form className='post-job' onSubmit={handleSubmit}>
        <h2>Post a Job</h2>
        <input
          type='text'
          name='title'
          placeholder='Job Title'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='company'
          placeholder='Company'
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
        <textarea
          name='requirements'
          placeholder='Requirements'
          required
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default PostJob;
