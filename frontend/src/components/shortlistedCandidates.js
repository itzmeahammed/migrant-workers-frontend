import React, { useEffect, useState } from "react";
import "../styles/jobs.css";
import { GET_SHORTLISTED_CANDIDATES } from "../helper/apiurls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoaderPopup from "./loader";

const ShortListedCandidates = () => {
  const token = Cookies.get("token");
  const [shortlistedData, setshortlistedData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchshortlisted = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${GET_SHORTLISTED_CANDIDATES}?selected=${encodeURIComponent(
          "selected"
        )}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setshortlistedData(data);
    } catch (error) {
      setError("Failed to load shortlisted candidates. Please try again.");
      console.error("Error fetching shortlisted candidates:", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchshortlisted();
  }, []);

  return (
    <>
      {isLoading && <LoaderPopup />}
      <div className='jobs-main-container d-flex gap-16'>
        {error && <div className='no-data-message'>{error}</div>}
        {shortlistedData.length === 0 && !isLoading && !error && (
          <div className='no-data-message'>No Data Available</div>
        )}
        {shortlistedData.map((val, key) => {
          return (
            <div className='jobs-container d-flex-col gap-8 p-16' key={key}>
              <h2>{val?.job?.title}</h2>
              <h3>{val?.user?.username}</h3>
              <p>{val?.user?.email}</p>
              <p>{val?.user?.address}</p>
              <p>{val?.user?.location}</p>
              <p>{val?.user?.number}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShortListedCandidates;
