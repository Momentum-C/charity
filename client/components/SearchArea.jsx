import React from 'react';

const SearchArea = ({ categories, setCategories }) => {
  const updateCategory = (index) => {
    const temp = [];
    for (let i = 0; i < categories.length; i += 1) {
      if (i !== index) {
        temp.push(categories[i]);
      } else {
        const categoriesTemp = { ...categories[i] };
        categoriesTemp[i] = !categoriesTemp[i];
        temp.push(categoriesTemp);
      }
    }
    return temp;
  }
  const falseButtons = [];
  const trueButtons = [];
  categories.forEach((category, index) => {
    const button = (<button type='submit' key={'button' + index} id={'button' + index} className='categoryButton' onClick={() => {
      const newState = updateCategory(index);
      setCategories(newState);
    }}>{category.name}</button>)
    if (category[index]) {
      trueButtons.push(button);
    } else {
      falseButtons.push(button);
    }
  });

  return (
    <div className='category-area'>
      <div className="false-area">
        {falseButtons.length > 0 ? <p>Category: </p> : false}
        {falseButtons}
      </div>
      <div className="true-area">
        {trueButtons.length > 0 ? <p>Selected: </p> : false}
        {trueButtons}
      </div>
    </div>

  )
}
export default SearchArea;