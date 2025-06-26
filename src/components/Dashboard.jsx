import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userActions } from "../store/userSlice";

export default function Dashboard() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && Number(userId) === storedUser.id) {
      dispatch(userActions.login(storedUser));
    }
  }, [dispatch, userId]);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Welcome, {user.name}</h2>
        <nav className="dashboard-actions">
          <Link to="addJob" className="dashboard-button">
            ➕ Add a new Job
          </Link>
          <Link to="viewJob" className="dashboard-button">
            📂 View all Jobs
          </Link>
        </nav>
      </aside>
      <main className="dashboard-main">
        <Outlet />
        {!location.pathname.includes("addJob") &&
          !location.pathname.includes("viewJob") &&
          !location.pathname.includes("editJob") && (
            <div className="dashboard-welcome">
              <h2>Let’s get started!</h2>
              <p>
                Select an option from the sidebar to begin managing your job
                applications.
              </p>
            </div>
          )}
      </main>
    </div>
  );
}
