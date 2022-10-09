import React from "react";

function Filter(props) {
  return (
    <>
      <div className="filter">
        Filter by : 
        <select value={props.date} onChange={props.handleFilter}>
          <option className="option">Year</option>
          {props.releasedYears.map((year) => {
            return <option value={year}>{year}</option>;
          })}
     
        </select>
      </div>
    </>
  );
}

export default Filter;
