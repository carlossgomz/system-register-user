import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
	  <Link to="/" className="navbar-brand">
      <img src="../../img/react-img.png" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
      React Boilerplate
    </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/images" className="nav-link">
                Images 
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
			  	to=""
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Action User
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/register" className="dropdown-item">
                    Regiter User
                  </Link>
                </li>
                <li>
                  <Link to="/login"  className="dropdown-item">
                   Login User 
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="" className="dropdown-item">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <button className="btn btn-outline-success" type="submit" 
            onClick={() => {
              actions.logout();
            }}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
