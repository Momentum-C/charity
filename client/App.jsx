import Login from './containers/Login.jsx';
import Signup from './components/Signup.jsx'
import MainContainer from './containers/MainContainer';
import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = 'display: block;margin: 0 auto;border-color: red;';

const App = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [isSearchTab, setIsSearchTab] = useState(true);
  const [charity, setCharity] = useState([]);
  const [twoLetterState, setTwoLetterState] = useState('');
  const [isFundraisingOrg, setIsFundraisingOrg] = useState(false);
  const [categories, setCategories] = useState([
    { '0': false, name: 'Animals' },
    { '1': false, name: 'Arts, Culture, Humanities' },
    { '2': false, name: 'Education' },
    { '3': false, name: 'Environment' },
    { '4': false, name: 'Health' },
    { '5': false, name: 'Human Services' },
    { '6': false, name: 'International' },
    { '7': false, name: 'Human and Civil Rights' },
    { '8': false, name: 'Religion' },
    { '9': false, name: 'Community Development' },
    { '10': false, name: 'Research and Public Policy' }
  ]);
  const [fetchedCategoryData, setFetchedCategoryData] = useState([]);
  const [interested, setInterested] = useState([]);
  const [searchNumber, setSearchNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handleLoginDetails = (name, value) => {
    const updatedLoginDetails = { ...userDetails };
    updatedLoginDetails[name] = value;
    setUserDetails(updatedLoginDetails);
  }
  useEffect(() => {
    const { username } = userDetails;
    fetch('/checkCookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then((res) => res.json())
      .then((data) => {
        const { isLoggedIn, username, reply, donated } = data;
        setIsLoggedIn(isLoggedIn);
        if (isLoggedIn) {
          username ? handleLoginDetails('username', username) : false;
          reply ? setInterested(reply) : false;
          console.log(donated)
          donated ? setCharity(donated) : false;
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const displaySignUpComponent = () => {
    setIsSignedUp(wasSignedUp => !wasSignedUp);
  };

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
      .then((res) => res.json())
      .then((data) => {
        /**
         * Three options here, performance benefits? (have not hard tested this yet)
         */
        // window.location.href = window.location.href
        // location.reload()
        window.location = document.URL;
      })
      .catch((err) => console.error(err))
  }
  const handleSignupOrLogin = () => {
    const userStatus = isSignedUp ? 'login' : 'signup';
    fetch(`/${userStatus}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
      .then((res) => res.json())
      .then((data) => {
        const { isLoggedIn, username, reply, donated } = data;
        setIsLoggedIn(isLoggedIn);
        if (username) handleLoginDetails('username', username);
        if (reply) setInterested(reply);
        if (donated) setCharity(donated);
      })
      .catch((err) => console.error(err));
  }
  //fetching data using a post request, sending user input as body
  const fetchData = () => {
    const fundraisingOrgs = isFundraisingOrg;
    const state = twoLetterState;
    const trueIndices = categories.map((objects, index) => {
      if (objects[index]) {
        return index + 1;
      };
    }).filter((elements) => elements !== undefined);
    fetch('/api/fetchData', {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        preferences: {
          fundraisingOrgs,
          state,
          ids: trueIndices,
          searchNumber: searchNumber
        }
      })
    })
      .then((res) => res.json())
      .then((result) => {
        //setting category data to be passed to category container
        const data = [];
        result.forEach(array => {
          array.forEach(object => {
            data.push(object);
          })
        })
        setFetchedCategoryData(data)
      })
      .catch((err) => {
        console.log('something broke inside of .then chain inside of fetchData method')
      })
  }
  const sendInterests = (interests) => {
    const { username } = userDetails;
    fetch('/interests', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username, interests })
    })
      .then(res => res.json())
      .then(result => {
        if (result) {
          console.log('successfully sent to redis')
        }
      })
      .catch(err => {
        console.log('something broke inside of .then chain inside of sendInterests method', err)
      })
  }
  const deleteDonation = (index) => {
    const charityClone = [];
    for (let i = 0; i < charity.length; i += 1) {
      if (i !== index) {
        charityClone.push(charity[i]);
      }
    }
    setCharity(charityClone);
    fetch('/charity', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: charity[index]._id })
    })
      .then((res) => {
        console.log('successfully deleted from database');
      })
      .catch((err) => {
        console.log('fetch to /charity to delete a charity has broke')
      })
  }
  const editDonation = (index, newCharityData) => {
    const charityClone = [];
    let updatedDataRow;
    for (let i = 0; i < charity.length; i += 1) {
      if (i !== index) {
        charityClone.push(charity[i]);
      } else {
        const updatedData = { ...charity[i], ...newCharityData };
        charityClone.push(updatedData);
        updatedDataRow = updatedData;
      }
    }
    setCharity(charityClone);
    fetch('/updateDonation', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newData: updatedDataRow })
    })
      .then((res) => {
        console.log(res, 'successful update!')
      })
      .catch((err) => {
        console.log('/updateDonation route has broken')
      })
  }

  const display = isLoading ? <ClipLoader
    size={150} // or 150px
    color={"#123abc"}
    loading={isLoading}
  /> : (
      <>
        {isLoggedIn && <MainContainer
          handleLogout={handleLogout}
          username={userDetails.username}
          charity={charity}
          setCharity={setCharity}
          deleteDonation={deleteDonation}
          editDonation={editDonation}
          categories={categories}
          setCategories={setCategories}
          fetchData={fetchData}
          setTwoLetterState={setTwoLetterState}
          setIsFundraisingOrg={setIsFundraisingOrg}
          fetchedCategoryData={fetchedCategoryData}
          setInterested={setInterested}
          interested={interested}
          setSearchNumber={setSearchNumber}
          sendInterests={sendInterests}
          isSearchTab={isSearchTab}
          setIsSearchTab={setIsSearchTab}
        />}
        {!isLoggedIn && isSignedUp && <Login
          handleLoginDetails={handleLoginDetails}
          handleSignupOrLogin={handleSignupOrLogin}
          displaySignUpComponent={displaySignUpComponent}
        />}
        {!isLoggedIn && !isSignedUp && <Signup
          handleLoginDetails={handleLoginDetails}
          handleSignupOrLogin={handleSignupOrLogin}
          displaySignUpComponent={displaySignUpComponent}
        />}
      </>
    );

  return (
    <div className="App">
      {display}
    </div>
  );
}
export default App;