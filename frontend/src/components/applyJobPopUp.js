import React from "react";
import Modal from "@mui/material/Modal";
import ApplyJob from "./applyJob";

const ApplyJobPopUp = ({ open, setopen }) => {
  return (
    <Modal open={open?.isopen} onClose={() => setopen((prev) => !prev.isopen)}>
      <ApplyJob data={open?.data} setopen={setopen} />
    </Modal>
  );
};

export default ApplyJobPopUp;
