import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { setCurrentPage, setOffset } from "../../store/Utils/Pagination";

function BoardPagination() {
  const dispatch = useDispatch();
  const { totalCount, currentPage } = useSelector(
    (state: RootState) => state.pagination
  );

  const itemsPerPage = 6;
  const maxPaginationItems = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const currentSet = Math.ceil(currentPage / maxPaginationItems);
  const startPage = (currentSet - 1) * maxPaginationItems + 1;
  const endPage = Math.min(currentSet * maxPaginationItems, totalPages);

  const handlePaginationClick = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
    dispatch(setOffset((pageNumber - 1) * itemsPerPage));
  };

  return (
    <>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePaginationClick(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(endPage - startPage + 1).keys()].map((index) => (
          <Pagination.Item
            key={startPage + index}
            active={startPage + index === currentPage}
            onClick={() => handlePaginationClick(startPage + index)}>
            {startPage + index}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePaginationClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
}

export default BoardPagination;
