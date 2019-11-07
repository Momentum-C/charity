import React, { useState } from 'react';


const Donated = ({ charityName, amount }) => {
  console.log('here', charityName, amount)
  return (
    <div className="historyElement">
      <p>Charity: {charityName} Donation: {amount} </p>
      <button>share</button>
    </div>
  )
}
export default Donated;