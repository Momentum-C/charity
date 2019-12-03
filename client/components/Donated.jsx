import React, { useState } from 'react';
import Modal from 'react-modal';

const Donated = ({ charityName, amount, deleteDonation, editDonation, index, dateAdded }) => {
  const dateCreated = new Date(dateAdded);
  const newDate = dateCreated.toLocaleDateString();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isNewCharityData, setIsNewCharityData] = useState({
    charityName: '',
    amount: ''
  })
  return (
    <div className='donated-container'>
      <div className="historyElement">
        <p>Charity: {charityName}</p>
        <p>Donation: ${amount}</p>
        <p>Date Added: {newDate}</p>
        <div className='donations-update-delete-buttons'>
          <button id='edit' onClick={() => {
            setIsOpenModel(!isOpenModel)
          }}>Edit Donation</button>
          <button id='delete' onClick={() => {
            const input = window.prompt(`Are you sure you want to delete ${charityName}? \nType in ${charityName} to confirm`);
            if (input === charityName) {
              deleteDonation(index)
            }
          }}>Delete Donation</button>
        </div>
      </div>
      <Modal
        isOpen={isOpenModel}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        ariaHideApp={false}
      >
        <button style={{ marginBottom: '20px' }} onClick={() => {
          setIsOpenModel(!isOpenModel)
        }}>Close Editor</button>
        <form onSubmit={(e) => {
          e.preventDefault();
          setIsOpenModel(!isOpenModel);
          editDonation(index, isNewCharityData);
        }} onChange={(e) => {
          const inputCharityData = { ...isNewCharityData };
          inputCharityData[e.target.name] = e.target.value;
          setIsNewCharityData(inputCharityData)
        }}>
          <label htmlFor='new-charity-name'>New Charity Name: </label>
          <input style={{ width: '170px', marginTop: '20px' }} id='new-charity-name' name='charityName' defaultValue={charityName} />
          <br />
          <label htmlFor='new-charity-amount'>New Charity Amount: </label>
          <input style={{ width: '170px', marginTop: '20px' }} type='number' id='new-charity-amount' name='amount' defaultValue={amount} />
          <br />
          <input type='submit' placeholder={`Save Changes`} />
        </form>
      </Modal>
      <div id='share-button'>
        <button className='shareButton'>Share <strong>{charityName}</strong>!</button>
      </div>
    </div>
  );
}
export default Donated;