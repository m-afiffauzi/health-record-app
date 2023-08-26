"use client";
import React from "react";
import { TPagination } from "../libs/type";

export default function Pagination({
  totalData,
  dataPerPage,
  currentPage,
  setCurrentPage,
}: TPagination) {
  const totalPages = Math.ceil(totalData / dataPerPage);

  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const pages: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    pages.push(
      <button
        key={page}
        className={`join-item btn ${
          page == currentPage
            ? `btn-primary pointer-events-none`
            : `text-primary`
        }`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    );
  }

  return (
    <div className="w-full mt-4">
      <div className="join hidden sm:flex justify-center">{pages}</div>
      <div className="join flex sm:hidden justify-center">
        <button
          className={`join-item btn text-primary ${
            currentPage <= 1 ? "btn-disabled" : ""
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          «
        </button>

        <button className="join-item btn btn-primary no-animation pointer-events-none">
          {currentPage}
        </button>
        <button
          className={`join-item btn text-primary ${
            currentPage >= totalPages ? "btn-disabled" : ""
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
}
