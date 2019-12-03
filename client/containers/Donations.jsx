import React from 'react';
import DonatedList from '../components/DonatedList.jsx';
import DataVis from '../components/DataVis.jsx';
import Tabs from '../components/Tabs.jsx';
const Donations = ({
  charity,
  setCharity,
  username,
  isSearchTab,
  setIsSearchTab,
  deleteDonation,
  editDonation
}) => {

  return (
    <React.Fragment>
      <div className='tabs-area'>
        <Tabs isSearchTab={isSearchTab} setIsSearchTab={setIsSearchTab} />
      </div>
      <div className='donated-container-margin-top-spacing'>
        <div className='donated-container'>
          <div className='donation-list'>
            <DonatedList
              username={username}
              charity={charity}
              setCharity={setCharity}
              deleteDonation={deleteDonation}
              editDonation={editDonation}
            />
          </div>
          <div className='data-visualizer'>
            <DataVis charity={charity} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Donations;