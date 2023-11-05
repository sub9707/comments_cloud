import { Table } from "../../styles/TableStyle";
import { UserTableProps } from "../../types/users";

export default function UserTable(props: UserTableProps) {
  return (
    <Table>
      <tbody>
        <tr>
          <th style={{ width: "10%", textAlign: "center" }}>권한</th>
          <th style={{ width: "40%", textAlign: "center" }}>Email</th>
          <th style={{ width: "10%", textAlign: "center" }}>이름</th>
          <th style={{ width: "20%", textAlign: "center" }}>가입일자</th>
          <th style={{ width: "20%", textAlign: "center" }}>
            마지막 로그인 시간
          </th>
        </tr>
        {props.data.map((user, _idx) => (
          <tr key={_idx}>
            <td style={{ textAlign: "center" }} data-th="권한">
              {user?.id}
            </td>
            <td style={{ textAlign: "center" }} data-th="Email">
              {user?.email}
            </td>
            <td style={{ textAlign: "center" }} data-th="이름">
              {user?.name}
            </td>
            <td style={{ textAlign: "center" }} data-th="가입일자">
              {user?.registerDate}
            </td>
            <td style={{ textAlign: "center" }} data-th="최근 로그인">
              06/25/2016
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
