import React from 'react';
import Charity from './Charity' // is CharityDisplay supposed to render Charity?
import SearchArea from './SearchArea'

const SearchAreaForm = ({
  setTwoLetterState,
  setIsFundraisingOrg,
  fetchData,
  setSearchNumber
}) => {
  const states = [
    "CA - California",
    "AL - Alabama",
    "AR - Arkansas",
    "AS - American Samoa",
    "AZ - Arizona",
    "AK - Alaska",
    "CO - Colorado",
    "CT - Connecticut",
    "DC - District of Columbia",
    "DE - Delaware",
    "FL - Florida",
    "GA - Georgia",
    "GU - Guam",
    "HI - Hawaii",
    "IA - Iowa",
    "ID - Idaho",
    "IL - Illinois",
    "IN - Indiana",
    "KS - Kansas",
    "KY - Kentucky",
    "LA - Louisiana",
    "MA - Massachusetts",
    "MD - Maryland",
    "ME - Maine",
    "MI - Michigan",
    "MN - Minnesota",
    "MO - Missouri",
    "MS - Mississippi",
    "MT - Montana",
    "NC - North Carolina",
    "ND - North Dakota",
    "NE - Nebraska",
    "NH - New Hampshire",
    "NJ - New Jersey",
    "NM - New Mexico",
    "NV - Nevada",
    "NY - New York",
    "OH - Ohio",
    "OK - Oklahoma",
    "OR - Oregon",
    "PA - Pennsylvania",
    "PR - Puerto Rico",
    "RI - Rhode Island",
    "SC - South Carolina",
    "SD - South Dakota",
    "TN - Tennessee",
    "TX - Texas",
    "UT - Utah",
    "VA - Virginia",
    "VI - Virgin Islands",
    "VT - Vermont",
    "WA - Washington",
    "WI - Wisconsin",
    "WV - West Virginia",
    "WY - Wyoming"];

  const dropDownListItems = [];

  states.forEach((stateString, i) => {
    dropDownListItems.push(<option value={stateString.slice(0, 2)} key={i}>{stateString.slice(5)}</option>)
  })

  return (
    <div id='search-area-form'>
      <form onSubmit={(e) => {
        e.preventDefault();
        fetchData
      }}>
        <div>
          <label>State (default CA): </label>
          <select onChange={(e) => {
            setTwoLetterState(e.target.value)
          }}>
            {dropDownListItems}
          </select>
        </div>
        <div>
          <label>Fundraising Organization (default False)?: </label>
          <input type='checkbox' onChange={(e) => {
            setIsFundraisingOrg(e.target.checked)
          }} />
        </div>
        <div>
          <label>How many Searches (default 1)?:  </label>
          <input id='number-of-searches' type='number' onChange={(e) => {
            setSearchNumber(e.target.value);
          }}></input>
        </div>
        <div id='search-charity'>
          <button onClick={fetchData}>Search Charities</button>
        </div>
      </form>
    </div >
  )
}

export default SearchAreaForm;