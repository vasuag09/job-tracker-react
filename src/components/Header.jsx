import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logoImg.png";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  function handleLogout() {
    dispatch(userActions.logout());
    localStorage.removeItem("user"); // clear persisted user
    navigate("/"); // redirect to home
  }

  return (
    <header>
      <div className="logo">
        <img src={logoImg} alt="Logo" />
        <h1>Job Tracker</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              {({ isActive }) => (
                <button className={isActive ? "active" : undefined}>
                  Home
                </button>
              )}
            </NavLink>
          </li>

          {!user && (
            <li>
              <NavLink to="/login">
                {({ isActive }) => (
                  <button className={isActive ? "active" : undefined}>
                    Login
                  </button>
                )}
              </NavLink>
            </li>
          )}

          {user && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
