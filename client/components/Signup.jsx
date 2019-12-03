import React from 'react';

const Signup = ({ handleLoginDetails, handleSignupOrLogin, displaySignUpComponent }) => {
  return (
    <div className="signup-container">
      <div className="input-container">
        <h1>Sign Up</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSignupOrLogin();
        }} onChange={(e) => {
          handleLoginDetails(e.target.name, e.target.value);
        }}>
          <div className="usernameInputs">
            <label htmlFor='signup-username-input-field'>Username:</label>
            <input id='signup-username-input-field' name='username' type="text" required />
          </div>
          <div className="passwordInputs">
            <label htmlFor='signup-password-input-field'>Password:</label>
            <input id='signup-password-input-field' name='password' type="password" required />
          </div>
          <div className="login-buttons">
            <button type='submit' className="login-sign-up button" onClick={handleSignupOrLogin}>Sign Up</button>
            <button className="login-log-in button" onClick={displaySignUpComponent}>Go back</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signup;