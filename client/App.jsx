import Login from './containers/Login.jsx';
import Signup from './components/Signup.jsx'
import Search from './containers/Search.jsx';
import Donations from './containers/Donations.jsx';
import Header from './components/Header.jsx';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [userStatus, setUserStatus] = useState('login');
  const [isUserDetails, setIsUserDetails] = useState({
    username: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [isSearchTab, setisSearchTab] = useState(true);
  const [isCharity, setIsCharity] = useState([]);
  const [isTwoLetterState, setIsTwoLetterState] = useState('');
  const [isFundraisingOrg, setIsFundraisingOrg] = useState(false);
  const [isCategory, setIsCategory] = useState([
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
  const [isFetchedCategoryData, setIsFetchedCategoryData] = useState([]);
  const [isInterested, setIsInterested] = useState([]);
  const [isSearchNumber, setIsSearchNumber] = useState(0);
  const [isCheckingCookie, setIsCheckingCookie] = useState(false);
  const handleLoginDetails = (name, value) => {
    const updatedLoginDetails = { ...isUserDetails };
    updatedLoginDetails[name] = value;
    setIsUserDetails(updatedLoginDetails);
  }
  useEffect(() => {
    const { username } = isUserDetails;
    setIsCheckingCookie(!isCheckingCookie);
    fetch('/checkCookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(res => res.json())
      .then((data) => {
        const { isLoggedIn, username, reply, donated } = data;
        setIsLoggedIn(isLoggedIn);
        username ? handleLoginDetails('username', username) : false;
        reply ? setIsInterested(reply) : false;
        donated ? setIsCharity(donated) : false;
        console.log('here inside of fetch', isLoggedIn, isCheckingCookie)
        setIsCheckingCookie(!isCheckingCookie);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const loginOrSignupString = isSignedUp ? 'login' : 'signup';
    setUserStatus(loginOrSignupString);
  }, [isSignedUp]);

  const displaySignUpComponent = () => {
    setIsSignedUp(!isSignedUp);
  };

  const handleLogOut = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(isUserDetails)
    })
      .then(res => res.json())
      .then(data => {
        /**
         * Three options here, performance benefits? (have not hard tested this yet)
         */
        // window.location.href = window.location.href
        // location.reload()
        window.location = document.URL;
      })
      .catch(err => console.error(err))
  }
  const handleSignupOrLogin = () => {
    fetch(`/${userStatus}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(isUserDetails)
    })
      .then(res => res.json())
      .then(data => {
        const { isLoggedIn, username, reply, donated } = data;
        setIsLoggedIn(isLoggedIn);
        if (username) handleLoginDetails('username', username);
        if (reply) setIsInterested(reply);
        if (donated) setIsCharity(donated);
      })
      .catch(err => console.error(err));
  }
  //fetching data using a post request, sending user input as body
  const fetchData = () => {
    const fundraisingOrgs = isFundraisingOrg;
    const state = isTwoLetterState;
    const trueIndices = isCategory.map((objects, index) => {
      if (objects[index]) {
        return index + 1;
      };
    }).filter(elements => elements !== undefined);
    fetch('/api/fetchData', {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        preferences: {
          fundraisingOrgs,
          state,
          ids: trueIndices,
          searchNumber: isSearchNumber
        }
      })
    })
      .then(res => res.json())
      .then(result => {
        //setting category data to be passed to category container
        const data = [];
        result.forEach(array => {
          array.forEach(object => {
            data.push(object);
          })
        })
        setIsFetchedCategoryData(data)
      })
      .catch(err => {
        console.log('something broke inside of .then chain inside of fetchData method')
      })
  }
  const sendInterests = (interests) => {
    const { username } = isUserDetails;
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
    const isCharityClone = [];
    for (let i = 0; i < isCharity.length; i += 1) {
      if (i !== index) {
        isCharityClone.push(isCharity[i]);
      }
    }
    setIsCharity(isCharityClone);
    fetch('/charity', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: isCharity[index]._id })
    })
      .then(res => {
        console.log(res);
        console.log('successfully deleted from database');
      })
      .catch(err => {
        console.log('fetch to /charity to delete a charity has broke')
      })
  }
  const editDonation = (index, newCharityData) => {
    const isCharityClone = [];
    let updatedDataRow;
    for (let i = 0; i < isCharity.length; i += 1) {
      if (i !== index) {
        isCharityClone.push(isCharity[i]);
      } else {
        const updatedData = { ...isCharity[i], ...newCharityData };
        isCharityClone.push(updatedData);
        updatedDataRow = updatedData;
      }
    }
    setIsCharity(isCharityClone);
    fetch('/updateDonation', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newData: updatedDataRow })
    })
      .then(res => {
        console.log(res, 'successful update!')
      })
      .catch(err => {
        console.log('/updateDonation route has broken')
      })
  }

  return (
    <div className="App">
      {
        isLoggedIn &&
        <div className="main-container">
          <Header handleLogOut={handleLogOut} username={isUserDetails.username} />
          {!isSearchTab &&
            <Donations
              username={isUserDetails.username}
              isCharity={isCharity}
              setIsCharity={setIsCharity}
              isSearchTab={isSearchTab}
              setisSearchTab={setisSearchTab}
              deleteDonation={deleteDonation}
              editDonation={editDonation}
            />}
          {isSearchTab && <Search
            isCategory={isCategory}
            setIsCategory={setIsCategory}
            fetchData={fetchData}
            setIsTwoLetterState={setIsTwoLetterState}
            setIsFundraisingOrg={setIsFundraisingOrg}
            isFetchedCategoryData={isFetchedCategoryData}
            setIsInterested={setIsInterested}
            isInterested={isInterested}
            setIsSearchNumber={setIsSearchNumber}
            sendInterests={sendInterests}
            isSearchTab={isSearchTab}
            setisSearchTab={setisSearchTab}
          />}
        </div>
      }
      {!isLoggedIn && isSignedUp && <Login
        handleLoginDetails={handleLoginDetails}
        handleSignupOrLogin={handleSignupOrLogin}
        displaySignUpComponent={displaySignUpComponent}
      />}
      {
        !isLoggedIn && !isSignedUp && <Signup
          handleLoginDetails={handleLoginDetails}
          handleSignupOrLogin={handleSignupOrLogin}
          displaySignUpComponent={displaySignUpComponent}
        />
      }
    </div>
  );
}
export default App;