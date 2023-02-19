import React from "react";
import { useGlobalContext } from "../context/AppContext.js";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const { numOfPages, page, handleFormChange } = useGlobalContext();

  // toggle pages
  const togglePage = (i) => {
    const nextpage = page + i;
    if (nextpage > numOfPages) return;
    if (nextpage < 1) return;
    handleFormChange({ page: nextpage });
  };

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  return (
    <Wrapper>
      <button className="prev-btn" onClick={() => togglePage(-1)}>
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => handleFormChange({ page: pageNumber })}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button className="next-btn" onClick={() => togglePage(1)}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
