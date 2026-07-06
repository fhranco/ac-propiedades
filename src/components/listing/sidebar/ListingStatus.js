'use client'

import React from "react";

const ListingStatus = ({filterFunctions}) => {
  const options = [
    { id: "flexRadioDefault3", value: "All", label: "Todos" , defaultChecked: true },
    { id: "flexRadioDefault1", value: "Buy", label: "Comprar" },
    { id: "flexRadioDefault2", value: "Rent", label: "Arrendar", },
  ];

  return (
    <>
      {options.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            checked={filterFunctions?.listingStatus == option.value}
            onChange={()=>filterFunctions.handlelistingStatus(option.value)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
