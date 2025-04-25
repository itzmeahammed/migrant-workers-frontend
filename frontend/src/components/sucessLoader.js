import React, { useState } from "react";
import Loader from "../assets/gif/successtick.gif";
import Modal from "@mui/material/Modal";
import "../styles/loader.css";

const SuccessLoader = ({
  isSubmitted,
  setIsSubmitted,
  open,
  setopen,
  setJobModalOpen,
}) => {
  return (
    <Modal
      open={open || isSubmitted}
      onClose={() => {
        isSubmitted
          ? setIsSubmitted(false)
          : setopen(false) || setJobModalOpen(false);
      }}
      className='d-flex-full'
    >
      <div className='loader-img-container d-flex-col d-flex-full'>
        <img src={Loader} alt='' width={150} height={150} />
        <h3>Success</h3>
      </div>
    </Modal>
  );
};

export default SuccessLoader;
