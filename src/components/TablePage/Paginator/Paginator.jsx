import React from "react";
import {ReactComponent as ArrowLeft} from "../../../assets/images/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../../assets/images/arrow-right.svg";
import cn from "classnames";


const Paginator = (props) => {

  const {
    portionSize = 10,
    totalItemsCount,
    itemsOnPage,
    pageNumber,
    portionNumber,
    setPortionNum
  } = props;

  if (!totalItemsCount) return null;

  const totalPages = Math.ceil(totalItemsCount / itemsOnPage);
  const totalPortions = Math.ceil(totalPages / portionSize);
  const lastPageButton = portionNumber * portionSize;
  const firstPageButton = lastPageButton - portionSize + 1;
  const pages = new Array(totalPages)
    .fill(0).map((item, index) => index + 1);

  return (
    <div className="paginator">

      <div className={cn("paginator__prev-page", portionNumber === 1 && "is-deactivated")}
           onMouseDown={(e) => e.preventDefault()}
           onClick={portionNumber > 1 ? (e) => {
             setPortionNum(p => --p );
             e.preventDefault();
           } : null}>
        <ArrowLeft/>
      </div>

      <div className="paginator__page-btns">
        {pages.map(p => {
          if (p >= firstPageButton && p <= lastPageButton) {
            return (
              <div key={p}
                   className={cn("paginator__page-btn", +pageNumber === p && "present-page")}
                   onMouseDown={(e) => e.preventDefault()}
                   onMouseUp={() => props.setPageNumber(p)}
              >
                {p}
              </div>
            )
          }
        })}
      </div>

      <div className={cn("paginator__next-page", portionNumber === totalPortions && "is-deactivated")}
           onMouseDown={(e) => e.preventDefault()}
           onClick={portionNumber < totalPortions ? (e) => {
             setPortionNum(p => ++p);
             e.preventDefault();
           } : null}>
        <ArrowRight/>
      </div>

    </div>
  )
};

export default Paginator