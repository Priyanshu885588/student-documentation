import React, { useEffect, useState } from "react";
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { searchStudentData } from "./services/Api";

const Pagination = ({
  pageCount,
  currentPage,
  fetchData,
  batch,
  setStudentData,
}) => {
  const [pages, setPages] = useState([]);
  const [searchbox, setsearchbox] = useState();

  const pagesToDisplay = 5;

  const handleSearch = async (event) => {
    if (event.target.value) {
      try {
        const data = await searchStudentData({
          name: event.target.value,
          batch,
        });
        if (data != "No students found...") {
          setStudentData(data);
        } else {
          setStudentData([]);
        }
      } catch (error) {
        console.log("error occured in searching");
      }
    } else {
      fetchData(batch, 1);
    }
  };

  const buildPagination = (pageIndex) => {
    let newPages = [];

    let start = 0;
    let end = pagesToDisplay;

    if (pageCount <= pagesToDisplay) {
      // If the total number of pages is less than or equal to the number of pages to display,
      // display all pages.
      end = pageCount;
    } else {
      // If the total number of pages is greater than the number of pages to display,
      // calculate the start and end page indexes accordingly.
      if (pageIndex > (pagesToDisplay - 1) / 2) {
        start = pageIndex - Math.floor((pagesToDisplay - 1) / 2);
        end = start + pagesToDisplay;
      }
  
      if (pageIndex > pageCount - (pagesToDisplay + 1) / 2) {
        start = pageCount - pagesToDisplay;
        end = pageCount;
      }
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
    <div className="flex justify-center">
      <div className="absolute left-10">
        <div className="relative ">
          <input
            type="text"
            className="relative h-14 w-[350px] rounded-lg border-gray-200 pl-7 pr-14 text-xl shadow-sm uppercase"
            placeholder="SEARCH"
            onChange={handleSearch}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
            <FaSearch />
          </span>
        </div>
      </div>
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
    </div>
  );
};

export default Pagination;
