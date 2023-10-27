import { Table } from "../../styles/UserTableStyle";

export default function AdminBoardTable() {
  return (
    <Table style={{ marginTop: "2em" }}>
      <tbody>
        <tr>
          <th style={{ width: "5%", textAlign: "center" }}>#</th>
          <th style={{ width: "70%", textAlign: "center" }}>제목</th>
          <th style={{ width: "25%", textAlign: "center" }}>작성일자</th>
        </tr>
        {/* {props.data.map((user, _idx) => (
          <tr key={_idx}>
            <td style={{ textAlign: "center" }} data-th="#">
              {user?.id}
            </td>
            <td style={{ textAlign: "center" }} data-th="제목">
              {user?.name}
            </td>
            <td style={{ textAlign: "center" }} data-th="작성일자">
              {user?.registerDate}
            </td>
          </tr>
        ))} */}
      </tbody>
    </Table>
  );
}
