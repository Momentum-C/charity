import React from 'react';

const Header = ({ handleLogout, username }) => {
  return (
    <React.Fragment>
      <div className="header-container">
        <div className="left-header">
          <p className="momentum">Momentum</p>
        </div>
        <button className="logout button" onClick={handleLogout}>Log Out</button>
      </div>
      <h3 id='welcome'>Welcome {username}</h3>
    </React.Fragment>
  )
}

export default Header;