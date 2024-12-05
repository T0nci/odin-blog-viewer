import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./NavBar.module.css";
import "../../global.css";
import GithubLogo from "../../assets/github.svg";

const NavBar = () => {
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("displayName"),
  );

  return (
    <div className={styles["main-container"]}>
      <nav className={styles.navigation}>
        <ul className={`${styles.nav} container`}>
          <li className={styles.home}>
            <Link to="/" className={styles["nav-link"]}>
              webdev.blog
            </Link>
          </li>
          {displayName ? (
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
      <main className={styles.main}>
        <div className="container">
          <Outlet context={{ setDisplayName }} />
        </div>
      </main>
      <footer className={styles["main-footer"]}>
        <div className={styles.footer + " container"}>
          <a href="https://github.com/T0nci" className={styles.github}>
            <img src={GithubLogo} alt="Github Logo" className={styles.icon} />
            T0nci
          </a>
        </div>
      </footer>
    </div>
  );
};

export default NavBar;
