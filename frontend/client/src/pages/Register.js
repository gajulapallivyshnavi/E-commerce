import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [clientErrors, setClientErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState(null);

  const clientValidationErrors = {};

  const runClientValidations = () => {
    if (formData.password.trim().length == 0) {
      clientValidationErrors.password = "password is required";
      setClientErrors(clientValidationErrors);
    }
    if (formData.email.trim().length === 0) {
      clientValidationErrors.email = "email is required";
      setClientErrors(clientValidationErrors);
    }
    if (formData.role.trim().length === 0) {
      clientValidationErrors.role = "role is required";
      setClientErrors(clientValidationErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    runClientValidations();
    // console.log(formData)
    if (Object.keys(clientValidationErrors).length == 0) {
      // console.log("no errors make api call")
      try {
        const response = await axios.post(
          "http://localhost:3010/api/users/register",
          formData
        );
        //  console.log(response.data)
        navigate("/login");
      } catch (err) {
        console.log(err);
        setServerErrors(err.response.data.errors);
      }
      setClientErrors({});
    } else {
      setClientErrors(clientValidationErrors);
    }
  };

  return (
    <>
      <h2>Register Page</h2>
      {serverErrors && (
        <div>
          <h3>Server Errors</h3>
          <ul>
            {serverErrors.map((ele, i) => {
              return <li key={i}>{ele.msg}</li>;
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="enter Email"
        />
        <br />
        {clientErrors && <p className="clientErrors">{clientErrors.email}</p>}

        <input
          type="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          placeholder="enter password"
        />
        <br />
        {clientErrors && (
          <p className="clientErrors">{clientErrors.password}</p>
        )}

        <input
          type="radio"
          name="role"
          value="buyer"
          id="buyer"
          onChange={(e) => {
            setFormData({ ...formData, role: e.target.value });
          }}
        />
        <label htmlFor="buyer">Buyer</label>

        <input
          type="radio"
          name="role"
          value="seller"
          id="seller"
          onChange={(e) => {
            setFormData({ ...formData, role: e.target.value });
          }}
        />
        <label htmlFor="seller">seller</label>
        <br />
        {clientErrors && <p className="clientErrors">{clientErrors.role}</p>}

        <input type="submit" />
      </form>
    </>
  );
}
