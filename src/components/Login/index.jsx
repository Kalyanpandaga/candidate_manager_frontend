import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import Cookies from "js-cookie";
import { API_BASE_URL, ROUTES } from "../../config/constants";
import "./index.css";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = API_BASE_URL + "/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_token", data.token, { expires: 23 / 24 });
        Cookies.set("user", JSON.stringify(data.user), { expires: 23 / 24 });
        navigate(ROUTES.DASHBOARD);
      } else {
        setShowError(true);
        setErrorMsg(data.error || "Login failed");
      }
    } catch (error) {
      setShowError(true);
      setErrorMsg(error.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="emailId" className="input-label">
            EMAIL
          </label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            placeholder="Email Address"
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input-field"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        {showError && <p className="error-message">* {errorMsg}</p>}

        <div className="signup-link">
          <Link to={ROUTES.SIGNUP}>Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
