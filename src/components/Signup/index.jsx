import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { API_BASE_URL, ROUTES } from "../../config/constants";

import "./index.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      const url = API_BASE_URL + "/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate(ROUTES.LOGIN);
      } else {
        setShowError(true);
        setErrorMsg(data.error || "Signup failed");
      }
    } catch (error) {
      setShowError(true);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label htmlFor="firstName" className="input-label">
            FIRST NAME
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="lastName" className="input-label">
            LAST NAME
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input-field"
            required
          />
        </div>

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

        <button type="submit" className="signup-button">
          Signup
        </button>

        {showError && <p className="error-message">* {errorMsg}</p>}
      </form>
    </div>
  );
};

export default Signup;
