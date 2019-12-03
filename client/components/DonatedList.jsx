import React, { useState } from 'react';
import Donated from './Donated.jsx';
import DonationInput from './DonationInput.jsx';
const DonatedList = ({
  username,
  isCharity,
  setIsCharity,
  deleteDonation,
  editDonation
}) => {
  const donArr = isCharity.map((charity, i) => {
    return (<Donated
      key={i}
      charityName={charity.charityName}
      amount={charity.amount}
      deleteDonation={deleteDonation}
      editDonation={editDonation}
      dateAdded={charity.date}
      index={i}
    />);
  })
  return (
    <React.Fragment>
      <DonationInput isCharity={isCharity} username={username} setIsCharity={setIsCharity} />
      {donArr}
    </React.Fragment>
  )
}
export default DonatedList;