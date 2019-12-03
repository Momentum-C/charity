import React, { useState } from 'react';

const DonationInput = ({ username, isCharity, setIsCharity }) => {

  const [isCharityIn, setIsCharityIn] = useState('');
  const [isAmountIn, setIsAmountIn] = useState('')

  function submitting(e) {
    e.preventDefault()
    const charityList = isCharity.slice();
    const donation = {
      username: username,
      charityName: isCharityIn,
      amount: isAmountIn
    };

    fetch(`/donation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donation)
    })
      .then(res => res.json())
      .then(data => {
        const { success } = data;
        if (success) {
          setIsCharityIn('');
          setIsAmountIn('');
          charityList.push(donation)
          setIsCharity(charityList);
        }
      })
  }

  return (
    <div id='donationInput'>
      <h3>Recently Donated Form</h3>
      <form onSubmit={submitting}>
        <div id='donation-form-inputs'>
          <div>
            <label htmlFor='charity-name'>Charity Name: </label>
            <input id='charity-name' name="charityInput" placeholder='Input Charity' value={isCharityIn} onChange={(e) => { setIsCharityIn(e.target.value) }} required></input>
          </div>
          <div>
            <label htmlFor='dollar-value'>Total Donated: </label>
            <input id='dollar-value' type='number' name="amountInput" placeholder='Input in Dollars' value={isAmountIn} onChange={(e) => setIsAmountIn(e.target.value)} required></input>
          </div>
          <div>
            <input id='submit-button-donation-input' type="submit" value="Track My Donation!" />
          </div>
        </div>
      </form>

    </div>
  )
}
export default DonationInput;