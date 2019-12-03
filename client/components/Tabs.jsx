import React from 'react';


const Tabs = ({ isSearchTab, setIsSearchTab }) => {
  return (
    isSearchTab ? (
      <div className='navigate-component-tab' onClick={() => { setIsSearchTab(!isSearchTab) }}>
        <p > Add & View Donations</p>
      </div>)
      : (
        <div className='navigate-component-tab' onClick={() => { setIsSearchTab(!isSearchTab) }}>
          <p>Search more charities!</p>
        </div>)
  )
}
export default Tabs;
