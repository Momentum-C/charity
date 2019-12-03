import React from 'react';
import Header from '../components/Header';
import Search from './Search';
import Donations from './Donations';

const MainContainer = ({
  handleLogout,
  username,
  charity,
  setCharity,
  deleteDonation,
  editDonation,
  categories,
  setCategories,
  fetchData,
  setTwoLetterState,
  setIsFundraisingOrg,
  setInterested,
  interested,
  setSearchNumber,
  sendInterests,
  isSearchTab,
  setIsSearchTab,
}) => {
  return (
    <div className="main-container">
      <Header handleLogout={handleLogout} username={username} />
      {(isSearchTab
        ? <Search
            categories={categories}
            setCategories={setCategories}
            fetchData={fetchData}
            setTwoLetterState={setTwoLetterState}
            setIsFundraisingOrg={setIsFundraisingOrg}
            setInterested={setInterested}
            interested={interested}
            setSearchNumber={setSearchNumber}
            sendInterests={sendInterests}
            isSearchTab={isSearchTab}
            setIsSearchTab={setIsSearchTab}
          />
        : <Donations
            username={username}
            charity={charity}
            setCharity={setCharity}
            isSearchTab={isSearchTab}
            setIsSearchTab={setIsSearchTab}
            deleteDonation={deleteDonation}
            editDonation={editDonation}
          />
      )}
    </div>
  );
};

export default MainContainer;
