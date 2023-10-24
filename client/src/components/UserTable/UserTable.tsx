import { Table } from "../../styles/UserTableStyle";

export default function UserTable() {
  return (
    <Table>
      <tbody>
        <tr>
          <th style={{ width: "10%", textAlign: "center" }}>권한</th>
          <th style={{ width: "40%", textAlign: "center" }}>Email</th>
          <th style={{ width: "10%", textAlign: "center" }}>이름</th>
          <th style={{ width: "20%", textAlign: "center" }}>가입일자</th>
          <th style={{ width: "20%", textAlign: "center" }}>
            최근 로그인 시간
          </th>
        </tr>
        <tr>
          <td style={{ textAlign: "center" }} data-th="권한">
            일반
          </td>
          <td style={{ textAlign: "center" }} data-th="Email">
            UPS@test.com
          </td>
          <td style={{ textAlign: "center" }} data-th="이름">
            ASDF19218
          </td>
          <td style={{ textAlign: "center" }} data-th="가입일자">
            06/25/2016
          </td>
          <td style={{ textAlign: "center" }} data-th="최근 로그인">
            06/25/2016
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "center" }} data-th="권한">
            일반
          </td>
          <td style={{ textAlign: "center" }} data-th="Email">
            UPS@test.com
          </td>
          <td style={{ textAlign: "center" }} data-th="이름">
            ASDF19218
          </td>
          <td style={{ textAlign: "center" }} data-th="가입일자">
            06/25/2016
          </td>
          <td style={{ textAlign: "center" }} data-th="최근 로그인">
            06/25/2016
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "center" }} data-th="권한">
            일반
          </td>
          <td style={{ textAlign: "center" }} data-th="Email">
            UPS@test.com
          </td>
          <td style={{ textAlign: "center" }} data-th="이름">
            ASDF19218
          </td>
          <td style={{ textAlign: "center" }} data-th="가입일자">
            06/25/2016
          </td>
          <td style={{ textAlign: "center" }} data-th="최근 로그인">
            06/25/2016
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "center" }} data-th="권한">
            일반
          </td>
          <td style={{ textAlign: "center" }} data-th="Email">
            UPS@test.com
          </td>
          <td style={{ textAlign: "center" }} data-th="이름">
            ASDF19218
          </td>
          <td style={{ textAlign: "center" }} data-th="가입일자">
            06/25/2016
          </td>
          <td style={{ textAlign: "center" }} data-th="최근 로그인">
            06/25/2016
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
