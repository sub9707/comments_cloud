import { useDispatch } from "react-redux";
import { Table } from "@styles/TableStyle";
import { UserTableProps } from "@/types/users";
import { openModal } from "@/store/Modal/Modal";
import { setUserModal } from "@/store/Modal/AdminUserModal";
import { getUserInfo } from "@api/user";

export default function UserTable(props: UserTableProps) {
  const dispatch = useDispatch();

  const handleOpenModal = async (userId: number) => {
    const userData = await getUserInfo(userId.toString());
    dispatch(setUserModal(userData[0]));
    dispatch(openModal({ modalType: "AdminUserModal", isOpen: true }));
  };

  // 검색어 강조
  const highlightSearchTerm = (text: string) => {
    if (!props.searchTerm.trim()) {
      return <>{text}</>;
    }

    const regex = new RegExp(`(${props.searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };
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
            <td
              className="text-underline-hover"
              style={{ textAlign: "center" }}
              onClick={() => handleOpenModal(user?.id)}
              data-th="Email">
              {highlightSearchTerm(user?.email)}
            </td>
            <td
              className="text-underline-hover"
              onClick={() => handleOpenModal(user?.id)}
              style={{ textAlign: "center" }}
              data-th="이름">
              {highlightSearchTerm(user?.name)}
            </td>
            <td style={{ textAlign: "center" }} data-th="가입일자">
              {user?.registerDate}
            </td>
            <td style={{ textAlign: "center" }} data-th="최근 로그인">
              {user?.last_login ? user?.last_login : "정보 없음"}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
