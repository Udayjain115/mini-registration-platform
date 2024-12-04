import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/login');
  };
  return (
    <div className="signup-container">
      <form className="signup-form">
        <div>
          <label>email</label>
          <input></input>
        </div>
        <div>
          <label>password</label>

          <input></input>
        </div>
        <div>
          <label>name</label>

          <input></input>
        </div>

        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
