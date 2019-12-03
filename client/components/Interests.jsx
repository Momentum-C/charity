import React from 'react';
import InterestChild from './InterestChild.jsx'
const Interests = ({ interested, setInterested, sendInterests }) => {
  let interestedChildren;
  if (interested && interested.length > 0) {
    interestedChildren = interested.map((obj, i) => {
      return (<InterestChild
        key={`interest-child${i}`}
        url={obj.url}
        name={obj.name}
        tagLine={obj.tagLine}
        stars={obj.stars}
        setInterested={setInterested}
      />);
    })
  }

  return (
    <div id='interested-charities'>
      <h1>Interested Charities</h1>
      <button id='save-charities' onClick={() => {
        sendInterests(interested)
      }}>Save These Charities!</button>
      <div id='interests-children'>
        {interestedChildren ? interestedChildren : false}
      </div>

    </div>
  )
}

export default Interests;