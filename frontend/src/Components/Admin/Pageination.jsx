// Save this file with a .jsx extension, e.g., Pagination.jsx

import React, { useEffect, useState } from "react";
// Include any other global styles you might have

const Pagination = ({
  pagesToDisplay = 5,
  pageCount = 10,
}) => {
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState();

  const buildPagination = (pageIndex) => {
    setActivePage(pageIndex);

    console.log("pageIndex", pageIndex);

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
        className="grid place-items-center w-34 h-34 p-0 border-0 border-radius-3 bg-262528 text-f9f9f9 text-18 cursor-pointer"
        type="button"
      >
        first_page
      </button>
      {pages.map((page) => (
        <button
          className={`grid place-items-center w-34 h-34 p-0 border-0 border-radius-3 font-euclid text-14 ${
            page === activePage ? "bg-8f44fd text-white" : ""
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
        className="grid place-items-center w-34 h-34 p-0 border-0 border-radius-3 bg-262528 text-f9f9f9 text-18 cursor-pointer"
        type="button"
      >
        last_page
      </button>
    </div>
  );
};

export default Pagination;
