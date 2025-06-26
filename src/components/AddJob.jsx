import { useDispatch } from "react-redux";
import Input from "./UI/Input";
import { Form, useActionData } from "react-router-dom";
import { jobActions } from "../store/jobSlice";

export default function AddJob() {
  return (
    <Form className="add-job-form" method="post">
      <h2>Add a New Job</h2>

      <div className="form-group">
        <Input name="title" id="title" label="Job Title:" type="text" required />
      </div>

      <div className="form-group">
        <Input name="company" id="company" label="Company Name:" type="text" required />
      </div>

      <div className="form-group">
        <Input name="location" id="location" label="Location:" type="text" />
      </div>

      <div className="form-group">
        <label htmlFor="type">Job Type:</label>
        <select id="type" name="type" required>
          <option value="">Select type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Job Status:</label>
        <select id="status" name="status" required>
          <option value="">Select status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="form-group">
        <Input name="appliedDate" id="appliedDate" label="Date Applied:" type="date" />
      </div>

      <div className="form-group">
        <Input name="salary" id="salary" label="Salary:" type="text" />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" name="notes" rows="4" />
      </div>

      <div className="form-group">
        <button type="submit">Add Job</button>
      </div>
    </Form>
  );
}
