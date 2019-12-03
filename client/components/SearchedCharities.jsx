import React from 'react';
const SearchedCharities = ({
  name,
  mission,
  url,
  tagLine,
  stars,
  categoryName,
  location,
  setIsInterested,
  data,
  isInterested,
  index
}) => {
  const splitText = mission.split('<br>');
  const resultOfConcattingPTags = splitText.map(el => {
    return (
      <p>{el}</p>
    );
  })
  return (
    <div className='single-charity'>
      <h1>{name}</h1>
      <img src={stars}></img>
      <h3>{categoryName}</h3>
      <p><em>{tagLine}</em></p>
      {resultOfConcattingPTags}
      <a href={url}>{url}</a>
      <p>State: {location}</p>
      <button id={`interest-button${index}`} disabled={false} onClick={(e) => {
        // interests getting updated with a new object
        const disabledButton = document.getElementById(`interest-button${index}`);
        const newInterests = [...isInterested];
        disabledButton.disabled = true;
        newInterests.push(data);
        setIsInterested(newInterests);
      }}>Add to Interests</button>
    </div>
  );
}
export default SearchedCharities;