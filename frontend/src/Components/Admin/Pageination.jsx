import React, { useEffect, useState } from "react";
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";

const Pagination = ({ pageCount, currentPage, fetchData, batch }) => {
  const [pages, setPages] = useState([]);

  const pagesToDisplay = 5;

  const buildPagination = (pageIndex) => {
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
    buildPagination(currentPage);
  }, [currentPage, pageCount]);

  const handleChange = (page) => {
    fetchData(batch, page + 1);
  };

  return (
    <div className="flex gap-4">
      <button
        disabled={currentPage === 0}
        onClick={() => {
          buildPagination(0), handleChange(0);
        }}
        className="grid place-items-center w-35 h-34 p-3 border-2 rounded-xl font-euclid text-14 shadow-md bg-white text-black text-18 cursor-pointer"
        type="button"
      >
        <IoPlayBackSharp />
      </button>
      {pages.map((page) => (
        <button
          className={`grid place-items-center w-35 h-34 p-3 border-2 rounded-xl font-euclid text-14 shadow-md
           ${page === currentPage ? "bg-blue-300 text-black" : "bg-white"}`}
          onClick={() => {
            buildPagination(page), handleChange(page);
          }}
          key={page}
          type="button"
        >
          {page + 1}
        </button>
      ))}
      <button
        disabled={currentPage === pageCount - 1}
        onClick={() => {
          buildPagination(pageCount - 1), handleChange(pageCount - 1);
        }}
        className="grid place-items-center w-35 h-34 p-3 border-2 rounded-xl font-euclid text-14 shadow-md bg-white text-black text-18 cursor-pointer"
        type="button"
      >
        <IoPlayForwardSharp />
      </button>
    </div>
  );
};

export default Pagination;
