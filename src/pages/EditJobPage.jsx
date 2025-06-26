import { json, redirect, useNavigate } from "react-router-dom";
import EditJob from "../components/EditJob";

export default function EditJobPage() {
  return <EditJob />;
}

export async function action({ request, params }) {
  const userId = params.userId;
  const jobId = params.jobId;
  const data = await request.formData();
  const enteredData = {
    id: Number(jobId),
    userId: Number(userId),
    title: data.get("title"),
    company: data.get("company"),
    location: data.get("location"),
    type: data.get("type"),
    status: data.get("status"),
    appliedDate: data.get("appliedDate"),
    salary: data.get("salary"),
    notes: data.get("notes"),
  };
  const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`, {
    method: "PATCH",
    headers: {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify(enteredData)
  })
  if (!response.ok){
    throw json({message: "Error editing job"}, {status: 401})
  }
  const resData = await response.json()
  localStorage.setItem("updatedJob", JSON.stringify(resData.job))
  return redirect(`/${resData.job.userId}/dashboard/viewJob`);
}

export async function loader({request, params}){
    const response = await fetch(`http://localhost:3000/api/jobs/job/${params.jobId}`)
    if (!response.ok){
        throw json({message: "Error loading particular job data"}, {status: 401})
    }
    const resData = await response.json()
    return resData.job
}
