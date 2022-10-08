import React from "react";

function Filter(props) {
  return (
    <>
      <div className="filter">
        Filter by
        <input
          type="text"
          placeholder="Year of release"
          value={props.filter}
          onChange={props.handleFilter}
        />
      </div>
    </>
  );
}

export default Filter;
