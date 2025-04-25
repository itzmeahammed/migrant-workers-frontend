import React, { useState } from "react";
import "../styles/postjob.css";
import Cookies from "js-cookie";
import SuccessLoader from "./sucessLoader";

const PostJobMiniJobs = () => {
  const token = Cookies.get("token");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
    contact: "",
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
    }
    overAllData.push(formData);

    // Save to localStorage
    localStorage.setItem("minitaskData", JSON.stringify(overAllData));

    // Clear form after submission
    setFormData({
      title: "",
      company: "",
      description: "",
      location: "",
      salary: "",
      contact: "",
    });
    setIsSubmitted(true);
  };

  return (
    <>
      <SuccessLoader
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
      <form className='post-job' onSubmit={handleSubmit}>
        <h2>Post a Mini Job</h2>
        {/* Job Title */}
        <div className='input-group'>
          <h4>Job Title</h4>
          <input
            type='text'
            name='title'
            placeholder='Enter Job Title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact */}
        <div className='input-group'>
          <h4>Contact</h4>
          <input
            type='number'
            name='contact'
            placeholder='Enter Contact Number'
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div className='input-group'>
          <h4>Location</h4>
          <input
            type='text'
            name='location'
            placeholder='Enter Job Location'
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Salary */}
        <div className='input-group'>
          <h4>Salary</h4>
          <input
            type='text'
            name='salary'
            placeholder='Enter Salary Range'
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        {/* Job Description */}
        <div className='input-group'>
          <h4>Job Description</h4>
          <textarea
            name='description'
            placeholder='Enter Job Description'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Requirements */}
        <div className='input-group'>
          <h4>Requirements</h4>
          <textarea
            name='requirements'
            placeholder='Enter Job Requirements'
            value={formData.requirements}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type='submit' className='submit-button'>
          Submit Job
        </button>
      </form>
    </>
  );
};

export default PostJobMiniJobs;
