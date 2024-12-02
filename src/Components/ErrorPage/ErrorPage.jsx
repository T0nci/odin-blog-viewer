import { Link, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let errorMessage = null;
  if (error.status) errorMessage = `${error.status}: ${error.statusText}`;
  else if (error.error) errorMessage = `${error.error}`;
  else errorMessage = `${error}`;

  return (
    <div className={styles.parent}>
      <p className={styles.error}>{errorMessage}</p>
      <Link to="/" className={styles.link}>
        Go back to the homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
