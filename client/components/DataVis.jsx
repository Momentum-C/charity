import React from 'react';
import PieChart from 'react-minimal-pie-chart';
function sortForPie(arr, sortBy, accType = undefined) {
  const colorArr = ['#b5e37e', '#7db9ec', '#b784f2', '#f28ec4', '#eeaf7a', '#f66555', '#ffc66f', '#f8f9d4', '#3cccd0', '#008cd0']
  const obj = {};
  const output = [];
  let incColor = 0;
  arr.forEach(inArr => {
    if (accType) {
      if (obj[inArr[sortBy]]) {
        obj[inArr[sortBy]] += Number(inArr[accType]);
      } else {
        obj[inArr[sortBy]] = Number(inArr[accType]);
      }
    } else {
      if (obj[inArr[sortBy]]) {
        obj[inArr[sortBy]] += 1;
      } else {
        obj[inArr[sortBy]] = 1;
      }
    }
  })
  for (let key in obj) {
    output.push({ title: key, value: obj[key], color: colorArr[incColor] })
    incColor++;
    if (incColor > colorArr.length - 1) incColor = 0;
  }
  return output;
}

const DataVis = ({ charity }) => {
  const sum = charity ? charity.reduce((acc, val) => acc + Number(val.amount), 0) : 0;
  const pieData = sortForPie(charity, "charityName", "amount");
  const pie = <PieChart className='pieChart'
    data={
      pieData
    }
  />;
  const total = pieData.reduce((acc, val) => {
    return acc += val.value
  }, 0)

  const keyArr = pieData.map((obj, i) => {
    const tempTotalPercentage = ((obj.value / total) * 100).toFixed(2);
    return (
      <div className='pie-data-information' key={`color-region${i}`}>
        <h5 style={{ "backgroundColor": obj.color }}>{obj.title} : {tempTotalPercentage}%</h5>
      </div>
    );
  })

  return (
    <React.Fragment>
      <div className='data-vis-container'>
        <div id='data-vis-pie'>
          <h1>Donated Graph</h1>
          <h3>Total: ${sum}</h3>
          {pie}
        </div>
        <div id='data-vis-color-region'>
          <h1>Color Region</h1>
          {keyArr}
        </div>
      </div>
    </React.Fragment>
  )
}
export default DataVis;