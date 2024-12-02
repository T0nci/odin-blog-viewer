import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./NavBar.module.css";
import "../../global.css";

const NavBar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      <nav className={styles.navigation}>
        <ul className={`${styles.nav} container`}>
          <li className={styles.home}>
            <Link to="/" className={styles["nav-link"]}>
              webdev.blog
            </Link>
          </li>
          {token ? (
            <li>
              <Link to="/logout" className={styles["nav-link"]}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className={styles["nav-link"]}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={styles["nav-link"]}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <main>
        <div className="container">
          <Outlet context={{ setToken }} />
        </div>
      </main>
    </>
  );
};

export default NavBar;
