import React, { useEffect, useState } from "react";
import "../styles/jobs.css";
import { GET_APPLIED_JOBS_USER_URL, SHORTLIST_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoaderPopup from "./loader";
import { FaFilePdf } from "react-icons/fa";
import { Modal, Box, Button, Typography } from "@mui/material";

const JobsAppliedForUser = () => {
  const token = Cookies.get("token");
  const [appliedJobsData, setAppliedJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const fetchAppliedJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(GET_APPLIED_JOBS_USER_URL, {
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setAppliedJobsData(data);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      return [];
    }
    setIsLoading(false);
  };

  const handleDecision = async (id, status) => {
    try {
      const response = await fetch(`${SHORTLIST_URL}?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ selected: status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const result = await response.json();
      setModalMessage(`Candidate has been ${status}`);
      setOpenModal(true);
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Something went wrong.");
      setOpenModal(true);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {isLoading && <LoaderPopup />}
      {/* MUI Modal for Showing Status */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className='modal-box'>
          <Typography variant='h6' component='h2'>
            {modalMessage}
          </Typography>
          <Button onClick={handleCloseModal} color='primary'>
            Close
          </Button>
        </Box>
      </Modal>

      <div className='jobs-main-container d-flex gap-16'>
        {appliedJobsData.length === 0 && !isLoading && (
          <div className='no-data-message'>No Jobs Applied Yet!</div>
        )}
        {appliedJobsData.map((val, key) => {
          const resumeBlob = val.resume
            ? new Blob(
                [Uint8Array.from(atob(val.resume), (c) => c.charCodeAt(0))],
                {
                  type: "application/pdf",
                }
              )
            : null;
          const resumeUrl = resumeBlob ? URL.createObjectURL(resumeBlob) : null;

          return (
            <div className='jobs-container d-flex-col gap-8 p-16' key={key}>
              <h2>{val?.job?.title}</h2>
              <p>{val?.job?.location}</p>
              <p>{val?.job?.salary}</p>
              <p>{val?.job?.requirements}</p>
              <span>{val?.job?.description}</span>

              {resumeUrl && (
                <div className='d-flex-alc gap-8'>
                  <FaFilePdf />
                  <a
                    href={resumeUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    download={`resume_${key}.pdf`}
                    className='resume-link'
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default JobsAppliedForUser;
