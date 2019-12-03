import React, { useState } from 'react';
import Donated from './Donated.jsx';
import DonationInput from './DonationInput.jsx';
const DonatedList = ({
  username,
  charity,
  setCharity,
  deleteDonation,
  editDonation
}) => {
  const donArr = charity.map((charity, i) => {
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
      <DonationInput charity={charity} username={username} setCharity={setCharity} />
      {donArr}
    </React.Fragment>
  )
}
export default DonatedList;