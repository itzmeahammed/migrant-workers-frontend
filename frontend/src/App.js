import { Route, Routes } from "react-router-dom";
import "./App.css";
// import NearbyPGMap from "./components/pgMaps";
import Sidebar from "./components/sideBar";
import LoginSignUp from "./components/loginSignUp";
import Jobs from "./components/jobs";
import JobsApplied from "./components/jobs-applied";
import { useLocation } from "react-router-dom";
import PostJob from "./components/postJob";
import ShortListedCandidates from "./components/shortlistedCandidates";
import JobsAppliedForUser from "./components/jobs-applied-user";
import PostJobMiniJobs from "./components/postMiniJobs";
import MiniJobs from "./components/miniJobs";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Sidebar />}{" "}
      <Routes>
        <Route path={"/"} element={<LoginSignUp />} />
        <Route path={"/user/jobs"} element={<Jobs />} />
        <Route path={"/user/minijobs"} element={<MiniJobs />} />

        <Route path={"/user/post-minijobs"} element={<PostJobMiniJobs />} />

        <Route path={"/company/postjobs"} element={<PostJob />} />
        <Route path={"/company/selected"} element={<ShortListedCandidates />} />

        <Route
          path={"/user/jobs-applied-user"}
          element={<JobsAppliedForUser />}
        />

        <Route path={"/company/jobs-applied"} element={<JobsApplied />} />
      </Routes>
    </>
  );
}

export default App;
