import PropTypes from "prop-types";
import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import styles from "./AuthForm.module.css";

// One component for both login and register because they are almost exactly the same
const AuthForm = ({ path }) => {
  const setToken = useOutletContext();
  const [fields, setFields] = useState(
    path === "login"
      ? { username: "", password: "" }
      : { username: "", password: "", confirm: "", displayName: "" },
  );
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (path === "login") {
      // validate fields
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>
          {path[0].toUpperCase() + path.slice(1)}
        </h1>
        {errors !== null && (
          <ul>
            {errors.map((error) => (
              <li key={error.msg}>{error.msg}</li>
            ))}
          </ul>
        )}
        <div>
          <label htmlFor="username" className={styles.label}>
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            autoFocus
            autoComplete="off"
            required
            value={fields.username}
            onChange={(e) =>
              setFields((prevFields) => ({
                ...prevFields,
                username: e.target.value,
              }))
            }
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={fields.password}
            onChange={(e) =>
              setFields((prevFields) => ({
                ...prevFields,
                password: e.target.value,
              }))
            }
            className={styles.input}
          />
        </div>
        {path === "register" && (
          <>
            <div>
              <label htmlFor="confirm" className={styles.label}>
                Confirm password:
              </label>
              <input
                type="text"
                name="confirm"
                id="confirm"
                required
                value={fields.confirm}
                onChange={(e) =>
                  setFields((prevFields) => ({
                    ...prevFields,
                    confirm: e.target.value,
                  }))
                }
                className={styles.input}
              />
            </div>
            <div>
              <label htmlFor="displayName" className={styles.label}>
                Display name:
              </label>
              <input
                type="text"
                name="displayName"
                id="displayName"
                autoComplete="off"
                required
                value={fields.displayName}
                onChange={(e) =>
                  setFields((prevFields) => ({
                    ...prevFields,
                    displayName: e.target.value,
                  }))
                }
                className={styles.input}
              />
            </div>
          </>
        )}
        <div>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </div>
        <p className={styles.info}>
          {path === "login" ? (
            <>
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Login</Link>
            </>
          )}
        </p>
      </form>
    </>
  );
};

AuthForm.propTypes = {
  path: PropTypes.oneOf(["login", "register"]),
};

export default AuthForm;
