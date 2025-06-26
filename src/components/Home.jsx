import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-container">
      <div className="home-content">
        <section className="intro">
          <h2>Welcome to Job Tracker</h2>
          <p>
            Organize your job search with ease. Whether you're actively applying,
            preparing for interviews, or exploring opportunities — this app helps
            you stay in control and never miss a step.
          </p>
        </section>

        <section className="features">
          <h3>🚀 What You Can Do</h3>
          <ul>
            <li>📄 Add, edit & delete job applications</li>
            <li>🔍 Filter by status: Applied, Interview, Offer, Rejected</li>
            <li>📅 Track interview dates & follow-ups</li>
            <li>🗂️ Group jobs by company or role</li>
            <li>📊 See quick statistics at a glance</li>
          </ul>
        </section>

        <section className="how-it-works">
          <h3>📚 How It Works</h3>
          <ol>
            <li>Register or log in to your account</li>
            <li>Add jobs manually or import from LinkedIn</li>
            <li>Update status as you progress</li>
            <li>Stay organized and job-ready!</li>
          </ol>
        </section>

        <section className="cta">
          <p>✨ Ready to simplify your job hunt?</p>
          <Link to={"/signup"}><button>Get Started</button></Link>
        </section>
      </div>
    </main>
  );
}
