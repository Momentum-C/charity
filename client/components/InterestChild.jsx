import React from 'react';

const InterestChild = ({
  name,
  tagLine,
  stars,
  url,
  setInterested,
}) => {
  return (
    <div id='interest-child'>
      <div>
        <h3>{name}</h3>
        <img src={stars}></img>
        <p><em>{tagLine}</em></p>
      </div>
      <a href={url}>{url}</a>
      <button id='not-interested-button' onClick={() => {
        // const deleteAnInterest = [...isInterested];
        // const newInterests = [];
        // deleteAnInterest.forEach((object, index) => {
        //   if (object.name !== name) {
        //     newInterests.push(object);
        //   } else {
        //     newInterests.splice(index, 1);
        //   }
        // })
        setInterested(oldInterests => oldInterests.filter(o => o.name !== name));
      }}>I'm not interested anymore</button>
    </div>
  )
}

export default InterestChild;