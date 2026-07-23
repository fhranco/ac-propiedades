"use client";
import React from "react";

const PaginationTwo = ({
  pageNumber,
  setPageNumber,
  data = [],
  pageCapacity,
  type = "propiedades",
}) => {
  const totalPages = Math.ceil((data?.length || 0) / pageCapacity);

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber((pre) => pre - 1);
    }
  };

  const handleNext = () => {
    if (totalPages > pageNumber) {
      setPageNumber((pre) => pre + 1);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];

    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageNumber <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (pageNumber >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", pageNumber - 1, pageNumber, pageNumber + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const startItem = data.length === 0 ? 0 : (pageNumber - 1) * pageCapacity + 1;
  const endItem = Math.min(pageNumber * pageCapacity, data.length);

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
          <span className="page-link pointer" onClick={handlePrevious}>
            <span className="fas fa-angle-left" />
          </span>
        </li>

        {getPageNumbers().map((item, index) => (
          <li
            key={index}
            className={`page-item ${item === pageNumber ? "active" : ""} ${
              item === "..." ? "disabled" : ""
            }`}
            onClick={() => typeof item === "number" && setPageNumber(item)}
          >
            <span className="page-link pointer">{item}</span>
          </li>
        ))}

        <li className={`page-item ${pageNumber >= totalPages ? "disabled" : ""}`}>
          <span className="page-link pointer" onClick={handleNext}>
            <span className="fas fa-angle-right" />
          </span>
        </li>
      </ul>
      <p className="mt10 pagination_page_count text-center">
        {startItem}-{endItem} de {data.length} {type} disponibles
      </p>
    </div>
  );
};

export default PaginationTwo;
