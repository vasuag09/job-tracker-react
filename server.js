const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.json");
const JOBS_FILE = path.join(__dirname, "jobs.json");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // ✅ use built-in body parsing

// Helper: Read users from file
function readUsersFromFile() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

// Helper: Write users to file
function writeUsersToFile(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function readJobsFromFile() {
  if (!fs.existsSync(JOBS_FILE)) return [];
  const data = fs.readFileSync(JOBS_FILE);
  return JSON.parse(data);
}

function writeJobsToFile(jobs) {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
}

// Signup Route
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = readUsersFromFile();

  if (users.find((user) => user.email === email)) {
    return res.status(409).json({ message: "User already exists." });
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  writeUsersToFile(users);

  return res
    .status(201)
    .json({
      message: "User created successfully.",
      user: { id: newUser.id, name, email },
    });
});

// Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const users = readUsersFromFile();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  return res
    .status(200)
    .json({
      message: "Login successful.",
      user: { id: user.id, name: user.name, email: user.email },
    });
});
// Add Job Route
app.post("/api/jobs", (req, res) => {
  const {
    userId,
    title,
    company,
    location,
    type,
    status,
    appliedDate,
    salary,
    notes,
  } = req.body;

  if (!userId || !title || !company || !type || !status) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const jobs = readJobsFromFile();
  const newJob = {
    id: Date.now(),
    userId,
    title,
    company,
    location: location || "",
    type,
    status,
    appliedDate: appliedDate || null,
    salary: salary || "",
    notes: notes || "",
  };

  jobs.push(newJob);
  writeJobsToFile(jobs);

  return res
    .status(201)
    .json({ message: "Job added successfully!", job: newJob });
});
// GET /api/jobs/:userId => get all jobs for a specific user
app.get("/api/jobs/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const allJobs = readJobsFromFile();
  const userJobs = allJobs.filter((job) => job.userId === userId);
  console.log("User's Jobs:", userJobs);

  return res.status(200).json({ jobs: userJobs });
});
app.delete("/api/jobs/:jobId", (req, res) => {
  const jobId = Number(req.params.jobId);

  let jobs = readJobsFromFile();
  const index = jobs.findIndex(job => job.id === jobId);

  if (index === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  const deletedJob = jobs.splice(index, 1)[0];
  writeJobsToFile(jobs);

  res.status(200).json({ message: "Job deleted successfully", job: deletedJob });
});
app.patch("/api/jobs/:id", (req, res) => {
  const jobId = Number(req.params.id);
  const updatedJob = req.body;

  const jobs = readJobsFromFile();
  const index = jobs.findIndex((job) => job.id === jobId);

  if (index === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  jobs[index] = { ...jobs[index], ...updatedJob };
  writeJobsToFile(jobs);

  res.status(200).json({ message: "Job updated", job: jobs[index] });
});
app.get("/api/jobs/job/:jobId", (req, res) => {
  const jobId = Number(req.params.jobId);
  const jobs = readJobsFromFile();
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.status(200).json({ job });
});
// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
