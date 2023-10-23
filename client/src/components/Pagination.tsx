import Pagination from "react-bootstrap/Pagination";

export default function PaginationComp() {
  const active = 2;
  const items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
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
