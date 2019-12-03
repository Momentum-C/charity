import React, { useState } from 'react';
import SearchArea from '../components/SearchArea.jsx';
import SearchAreaForm from '../components/SearchAreaForm';
import SearchedCharities from '../components/SearchedCharities';
import Tabs from '../components/Tabs';
import Interests from '../components/Interests'
const Search = ({
  fetchData,
  setTwoLetterState,
  setIsFundraisingOrg,
  categories,
  setCategories,
  fetchedCategoryData,
  setInterested,
  interested,
  setSearchNumber,
  sendInterests,
  isSearchTab,
  setIsSearchTab
}) => {
  let charitiesArray
  if (fetchedCategoryData && fetchedCategoryData.length > 0) {
    charitiesArray = fetchedCategoryData.map((data, index) => {
      return (<SearchedCharities
        name={data.name}
        mission={data.mission}
        url={data.url}
        tagLine={data.tagLine}
        score={data.score}
        stars={data.stars}
        categoryName={data.categoryName}
        location={data.location}
        setInterested={setInterested}
        data={data}
        interested={interested}
        index={index}
      />);
    })
  }

  return (
    <React.Fragment>
      <div className='tabs-area'>
        <Tabs
          isSearchTab={isSearchTab}
          setIsSearchTab={setIsSearchTab}
        />
      </div>
      <div className="search-container">
        <div id='search-area'>
          <h1>Search For a Charity</h1>
          <SearchArea
            categories={categories}
            setCategories={setCategories}
          />
          <SearchAreaForm
            setTwoLetterState={setTwoLetterState}
            setIsFundraisingOrg={setIsFundraisingOrg}
            fetchData={fetchData}
            setSearchNumber={setSearchNumber}
          />
          <div id='interests-area'>
            <Interests
              interested={interested}
              setInterested={setInterested}
              sendInterests={sendInterests}
            />
          </div>
        </div>
        <div id='array-of-categories-area'>
          <h1>Charities</h1>
          {charitiesArray ? charitiesArray : <p>Still Searching?</p>}
        </div>
      </div>
    </React.Fragment>
  )
}




export default Search;