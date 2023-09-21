import React, { useState } from 'react';
import {Data} from './data'

export const SearchBar = ({ handleSearch, searchTerm, setSearchTerm }) => {
    const [searchResults, setSearchResults] = useState()

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
      <div className="flex lg:gap-2 w-full ">
        <input
          type="text"
          placeholder="Search by title..."
          className="px-8 py-3 lg:rounded-md w-full md:w-[40rem] outline-none text-black border border-gray-800"
          value={searchTerm}
          onChange={handleInputChange}
        />

        <button
          type="button"
          onClick={handleSearch}
          className="inline-flex items-center px-3  font-medium text-white bg-blue-700 lg:rounded-lg border border-blue-700 hover:bg-blue-800 "
        >
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          Search
        </button>
      </div>
    );
};

