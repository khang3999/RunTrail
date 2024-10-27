"use client";
import React, { useState } from "react";
import CategoryFilter from "../Filters/CategoryFilter";

export default function MyNavbar({ onCategoryClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav
        style={{ backgroundColor: "#101827" }}
        className="border-gray-200 dark:bg-gray-900 dark:border-gray-700"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-normal  p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://supersports.com.vn/cdn/shop/files/LOGO_SSP_RGB-02_c46e0135-659a-49a2-9b37-6afebf1112e4.jpg?v=1723429659&width=2082"
              className="h-8"
              alt="Super sport Logo"
            />
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isDropdownOpen ? "block" : "hidden"
            } w-full md:block md:w-auto self-start`}
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ml-4">
              <CategoryFilter onCategoryClick={onCategoryClick} />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
