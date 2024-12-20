import PropTypes from "prop-types";

const DemoButton = ({ setDisplayName, setErrors, navigate, ...props }) => {
  const handleClick = () => {
    fetch(import.meta.env.VITE_API_URL + "/login", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username: "demo", password: "Demo123!" }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("displayName", res.displayName);
        setDisplayName(res.displayName);
        navigate("/");
      })
      .catch((err) => setErrors([{ msg: `${err}` }]));
  };

  return (
    <button onClick={handleClick} {...props}>
      Try Demo Account
    </button>
  );
};

DemoButton.propTypes = {
  setDisplayName: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DemoButton;
