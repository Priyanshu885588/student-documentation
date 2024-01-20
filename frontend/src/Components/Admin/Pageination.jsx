import React, { useEffect, useState } from "react";
import { IoPlayBackSharp } from "react-icons/io5";
import { IoPlayForwardSharp } from "react-icons/io5";

const Pagination = ({ pageCount }) => {
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState();
  const [currentPage, setCurrentPage] = useState(0); // Add this line

  const pagesToDisplay = 5;

  const buildPagination = (pageIndex) => {
    setActivePage(pageIndex);
    setCurrentPage(pageIndex); // Update the current page
    
    let newPages = [];

    let start = 0;
    let end = pagesToDisplay;

    if (pageIndex > (pagesToDisplay - 1) / 2) {
      start = pageIndex - (pagesToDisplay - 1) / 2;
      end = start + pagesToDisplay;
    }

    if (pageIndex > pageCount - (pagesToDisplay + 1) / 2) {
      start = pageCount - pagesToDisplay;
      end = pageCount;
    }

    for (let i = start; i < end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  };

  useEffect(() => {
    buildPagination(0);
  }, []);

  return (
    <div className="flex gap-4">
      <button
        disabled={activePage === 0}
        onClick={() => buildPagination(0)}
        className="grid place-items-center w-35 h-34 p-3 border-2 rounded-xl font-euclid text-14 shadow-md bg-white text-black text-18 cursor-pointer"
        type="button"
      >
        <IoPlayBackSharp />
      </button>
      {pages.map((page) => (
        <button
          className={`grid place-items-center w-35 h-34 p-3 border-2 rounded-xl font-euclid text-14 shadow-md
           ${
             page === activePage ? "bg-blue-700 text-yellow-500" : "bg-white"
           }`}
          onClick={() => buildPagination(page)}
          key={page}
          type="button"
        >
          {page + 1}
        </button>
      ))}
      <button
        disabled={activePage === pageCount - 1}
        onClick={() => buildPagination(pageCount - 1)}
        className="grid place-items-center w-35 h-34 p-3 border-2 rounded-xl font-euclid text-14 shadow-md bg-white text-black text-18 cursor-pointer"
        type="button"
      >
        <IoPlayForwardSharp />
      </button>

      
      <div className="ml-4">Current Page: {currentPage + 1}</div>
    </div>
  );
};

export default Pagination;
