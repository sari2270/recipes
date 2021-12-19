import { useHistory, useLocation } from "react-router";

import classes from "./Sorting.module.css";

const Sorting = ({ sortType, setSortType }) => {
  const history = useHistory();
  const location = useLocation();

  const viewsClasses = `${classes["sort-type"]} ${
    sortType == "views" && classes.active
  } list-inline-item`;

  const dateClasses = `${classes["sort-type"]} ${
    sortType == "createdAt" && classes.active
  } list-inline-item`;

  const changeSortHandler = (selectedSortType) => {
    setSortType(selectedSortType);
    history.push(`${location.pathname}?sort=${selectedSortType}`);
  };

  return (
    <div>
      Sort by:
      <ul className="order list-inline-item">
        <li
          className={viewsClasses}
          onClick={()=>changeSortHandler("views")}
        >
          Views
        </li>
        <span>| </span>
        <li
          className={dateClasses}
          onClick={()=>changeSortHandler("createdAt")}
        >
          Date
        </li>
      </ul>
    </div>
  );
};

export default Sorting;
