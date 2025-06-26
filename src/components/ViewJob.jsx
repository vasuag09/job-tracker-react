import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { jobActions } from "../store/jobSlice";
import EditJob from "./EditJob";
import EditJobPage from "../pages/EditJobPage";

export default function ViewJob() {
  const loadedJobs = useLoaderData(); // keep for initializing
  const jobs = useSelector((state) => state.jobs.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { userId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(jobActions.setJobs(loadedJobs));
    }
  }, [loadedJobs]);
  useEffect(() => {
    const newJobStr = localStorage.getItem("newJob");
    if (newJobStr) {
      const newJob = JSON.parse(newJobStr);
      dispatch(jobActions.addJob(newJob));
      localStorage.removeItem("newJob"); // cleanup after using
    }
  }, [dispatch]);
  useEffect(() => {
    const updatedJobStr = localStorage.getItem("updatedJob");
    if (updatedJobStr) {
      const updatedJob = JSON.parse(updatedJobStr);
      dispatch(jobActions.updateJob({ updatedJob, id: updatedJob.id }));
      localStorage.removeItem("updatedJob");
    }
  });
  async function handleDelete(id) {
    const response = await fetch(`http://localhost:3000/api/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting job");
    }
    dispatch(jobActions.removeJob(Number(id)));
    console.log("After delete", jobs); // or add a `useSelector` again
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus ? job.status === selectedStatus : true;
    const matchesType = selectedType ? job.type === selectedType : true;

    return matchesSearch && matchesStatus && matchesType;
  });
  return (
    <>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title or company"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>
      <div className="job-list">
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <div className="tags">
              <span className="tag type">{job.type}</span>
              <span className={`tag status ${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </div>
            <p className="date">Applied on: {job.appliedDate}</p>
            <div className="job-actions">
              <Link to={`/${userId}/dashboard/${job.id}/editJob`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(job.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
