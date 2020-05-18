import React from "react";

function Pagination({ totalRecipe, recipePerPage, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecipe / recipePerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  return (
    <div>
      <nav className="">
        <ul className="pagination justify-content-center nav-fill nav nav-pills">
          {pageNumbers.map((page) => (
            <li className="page-item" key={page}>
              <a onClick={() => paginate(page)} href="!#" className="page-link">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
