import PropTypes from "prop-types";
import { useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import DemoButton from "../partials/DemoButton/DemoButton";
import styles from "./AuthForm.module.css";

// One component for both login and register because they are almost exactly the same
const AuthForm = ({ path }) => {
  const { setDisplayName } = useOutletContext();
  const navigate = useNavigate();
  const [fields, setFields] = useState(
    path === "login"
      ? { username: "", password: "" }
      : { username: "", password: "", confirm: "", displayName: "" },
  );
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(import.meta.env.VITE_API_URL + `/${path}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(fields),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setErrors(res.errors);
        } else {
          // if it's a success, and it's a login then we need to set the token and display name,
          // otherwise it's a register and we need to redirect to login
          if (path === "login") {
            // wherever the token is updated, the state needs to also be updated
            localStorage.setItem("token", res.token);
            localStorage.setItem("displayName", res.displayName);
            setDisplayName(res.displayName);
            navigate("/");
          } else {
            navigate("/login");
          }
        }
      })
      .catch((err) => setErrors([{ msg: `${err}` }]));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>
          {path[0].toUpperCase() + path.slice(1)}
        </h1>
        {errors !== null && (
          <ul className={styles.errors}>
            {errors.map((error) => (
              <li key={error.msg} className={styles.error}>
                {error.msg}
              </li>
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
            data-testid="password"
          />
        </div>
        {path === "register" && (
          <>
            <div>
              <label htmlFor="confirm" className={styles.label}>
                Confirm password:
              </label>
              <input
                type="password"
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
                data-testid="confirm"
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
      {path === "login" && (
        <DemoButton
          className={styles.demo + " " + styles.submit}
          setDisplayName={setDisplayName}
          setErrors={setErrors}
          navigate={navigate}
        />
      )}
    </>
  );
};

AuthForm.propTypes = {
  path: PropTypes.oneOf(["login", "register"]).isRequired,
};

export default AuthForm;
