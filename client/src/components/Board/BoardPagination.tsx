import React from "react";
import { Pagination } from "react-bootstrap";

function BoardPagination() {
  return (
    <>
      <Pagination>
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </>
  );
}

export default BoardPagination;
