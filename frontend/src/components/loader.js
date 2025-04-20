import React, { useState } from "react";
import Loader from "../assets/gif/loader.gif";
import Modal from "@mui/material/Modal";
import "../styles/loader.css";
const LoaderPopup = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        className='d-flex-full'
      >
        <div className='normal-loader-img-container d-flex-col d-flex-full'>
          <img src={Loader} alt='' width={250} height={250} />
        </div>
      </Modal>
    </div>
  );
};

export default LoaderPopup;
