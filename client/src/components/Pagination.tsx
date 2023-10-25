import Pagination from "react-bootstrap/Pagination";
import { PaginationCompProps } from "../types/Components-type";

export default function PaginationComp({
  active,
  totalItems,
  onPageChange,
}: PaginationCompProps) {
  const items = [];
  for (let number = 1; number <= totalItems; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      <Pagination>{items}</Pagination>
    </>
  );
}
