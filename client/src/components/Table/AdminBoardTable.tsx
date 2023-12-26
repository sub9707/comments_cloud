import { Table } from "@styles/TableStyle";
import { BoardInfoFetchType } from "@/types/board";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/Modal/Modal";
import { setBoardModal } from "@/store/Modal/AdminBoardModal";

function AdminBoardTable(props: { data: BoardInfoFetchType[] }) {
  const { data } = props;
  const dispatch = useDispatch();
  const handleOpenInfo = (board: BoardInfoFetchType) => {
    dispatch(setBoardModal(board));
    dispatch(openModal({ modalType: "AdminBoardModal", isOpen: true }));
  };
  return (
    <Table style={{ marginTop: "2em" }}>
      <tbody>
        <tr>
          <th style={{ width: "5%", textAlign: "center" }}>BID</th>
          <th style={{ width: "80%", textAlign: "center" }}>제목</th>
          <th style={{ width: "15%", textAlign: "center" }}>작성일자</th>
        </tr>
        {data.map((board, _idx) => (
          <tr key={_idx}>
            <td style={{ textAlign: "center" }} data-th="#">
              {board?.id}
            </td>
            <td
              style={{ textAlign: "center", cursor: "pointer" }}
              data-th="제목"
              onClick={() => handleOpenInfo(board)}>
              {board?.title}
            </td>
            <td style={{ textAlign: "center" }} data-th="작성일자">
              {board?.write_date}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AdminBoardTable;
