import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
    const {showAlert} = props;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      showAlert("Account Created Successfully","success")
    }
    else{
        showAlert("Invalid Credentials","danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-3">
      <h2>Sign up now to add your notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter Your Name 
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            required
            minLength={5}

          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
