import React, { useEffect, useState } from "react";
import "../styles/jobs.css";
import {
  GET_APPLIED_JOBS_ALL_URL,
  GET_APPLIED_JOBS_URL,
  SHORTLIST_URL,
} from "../helper/apiurls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoaderPopup from "./loader";
import { FaFilePdf } from "react-icons/fa6";
import { Modal, Box, Button, Typography } from "@mui/material";

const JobsApplied = () => {
  const token = Cookies.get("token");
  const [appliedJobsData, setAppliedJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State for controlling modal
  const [modalMessage, setModalMessage] = useState(""); // Message for modal
  const navigate = useNavigate();

  const fetchAppliedJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(GET_APPLIED_JOBS_ALL_URL, {
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
      setOpenModal(true); // Open the modal when the decision is made
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Something went wrong.");
      setOpenModal(true); // Show modal in case of error
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
    setOpenModal(false); // Close the modal
  };

  return (
    <>
      {isLoading && <LoaderPopup />}
      {/* MUI Modal for Showing Status */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box sx={modalStyle}>
          <Typography id='modal-title' variant='h6' component='h2'>
            Status Update
          </Typography>
          <Typography id='modal-description' sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
          <Button sx={{ mt: 2 }} variant='contained' onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </Modal>

      <div className='jobs-main-container d-flex gap-16'>
        {appliedJobsData.map((val, key) => {
          console.log(val);

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
                  >
                    View Resume
                  </a>
                </div>
              )}

              <div className='btn-group d-flex gap-8 mt-8'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleDecision(val?.id, "selected")}
                >
                  Shortlist
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => handleDecision(val?.id, "rejected")}
                >
                  Reject
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// Modal styles for MUI
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default JobsApplied;
