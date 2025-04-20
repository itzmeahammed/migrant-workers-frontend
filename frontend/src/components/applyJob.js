import React, { useState, useRef } from "react";
import "../styles/applyJob.css";
import { APPLY_JOB_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import SuccessLoader from "./sucessLoader";

const ApplyJob = ({ data, setopen }) => {
  const token = Cookies.get("token");
  const [isSubmitted, setisSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: data?.title || "",
    salary: data?.salary || "",
    company: data?.company || "",
    location: data?.location || "",
    first_name: "",
    last_name: "",
    zip: "",
    address: "",
    code: "",
    phone: "",
    your_email: "",
    checkbox: false,
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.checkbox) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (!uploadedFile) {
      alert("Please upload your resume.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("job_id", data?.id);
    formDataToSend.append("resume", uploadedFile);

    try {
      const res = await fetch(APPLY_JOB_URL, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formDataToSend,
      });

      const result = await res.json();
      console.log(result); // Handle response appropriately
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit application.");
    }

    setisSubmitted(true);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <>
      <SuccessLoader
        open={isSubmitted}
        setopen={setisSubmitted}
        setJobModalOpen={setopen}
      />

      <div className='form-v10-content'>
        <form className='form-detail' onSubmit={handleSubmit} id='myform'>
          <div className='form-left'>
            <h2>Job Details</h2>
            <div className='form-row'>
              <input
                type='text'
                name='title'
                id='title'
                className='input-text'
                placeholder='Title'
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <div className='form-row form-row-1'>
                <input
                  type='text'
                  name='first_name'
                  id='first_name'
                  className='input-text'
                  placeholder='First Name'
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-row form-row-2'>
                <input
                  type='text'
                  name='last_name'
                  id='last_name'
                  className='input-text'
                  placeholder='Last Name'
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='form-row'>
              <input
                type='text'
                name='salary'
                className='salary'
                id='salary'
                placeholder='Salary'
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-row'>
              <input
                type='text'
                name='company'
                className='company'
                id='company'
                placeholder='Company'
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-row'>
              <input
                type='text'
                name='location'
                className='companylocation'
                id='companylocation'
                placeholder='Company Location'
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Drag and Drop Area Aligned to Left */}
            <div
              className='drag-drop-area'
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click(); // This will now work
                }
              }}
            >
              <p>
                {uploadedFile
                  ? `Uploaded: ${uploadedFile.name}`
                  : "Drag & drop your resume here or click to upload"}
              </p>
              <span>(PDF, DOC, DOCX files)</span>
              {/* hidden file input */}
              <input
                type='file'
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept='.pdf,.doc,.docx'
              />
            </div>
          </div>

          <div className='form-right'>
            <h2>Contact Details</h2>
            <div className='form-group'>
              <div className='form-row form-row-1'>
                <input
                  type='text'
                  name='zip'
                  className='zip'
                  id='zip'
                  placeholder='Zip Code'
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-row form-row-1'>
                <input
                  type='text'
                  name='address'
                  className='address'
                  id='address'
                  placeholder='Address'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='form-group'>
              <div className='form-row form-row-1'>
                <input
                  type='tel'
                  name='code'
                  className='code'
                  id='code'
                  placeholder='Code +'
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-row form-row-2'>
                <input
                  type='text'
                  name='phone'
                  className='phone'
                  id='phone'
                  placeholder='Phone Number'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='form-row'>
              <input
                type='text'
                name='your_email'
                id='your_email'
                className='input-text'
                placeholder='Your Email'
                value={formData.your_email}
                onChange={handleChange}
                required
                pattern='[^@]+@[^@]+\.[a-zA-Z]{2,6}'
              />
            </div>
            <div className='form-checkbox'>
              <label
                className='container'
                style={{ margin: 0, justifyContent: "unset" }}
              >
                <p>
                  I do accept the &nbsp;
                  <a href='#' className='text'>
                    Terms and Conditions
                  </a>
                  &nbsp; of your site.
                </p>
                <input
                  type='checkbox'
                  name='checkbox'
                  checked={formData.checkbox}
                  onChange={handleChange}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            <div className='form-row-last'>
              <input
                type='submit'
                name='register'
                className='register'
                value='Apply Job'
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplyJob;
