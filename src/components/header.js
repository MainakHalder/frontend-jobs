import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-primary">
      <nav className="navbar navbar-expand-lg container">
        <h2 className="navbar-brand fw-semibold fs-5 text-light">
          Intern House
        </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/">
                Job Postings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/jobPosting">
                Post a Job
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
