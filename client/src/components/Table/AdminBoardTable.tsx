import { useDispatch } from "react-redux";
import { Table } from "../../styles/TableStyle";
import { NoticeTableProps } from "../../types/TableTypes";
import { openModal } from "../../store/Modal";
import { setData } from "../../store/NoticeModal";

export default function AdminBoardTable(props: NoticeTableProps) {
  const dispatch = useDispatch();
  const handleOpenModal = (id: number, title: string, content: string) => {
    dispatch(setData({ id: id, title: title, content: content }));
    dispatch(openModal({ modalType: "NoticeModal", isOpen: true }));
  };
  return (
    <Table style={{ marginTop: "2em" }}>
      <tbody>
        <tr>
          <th style={{ width: "5%", textAlign: "center" }}>#</th>
          <th style={{ width: "70%", textAlign: "center" }}>제목</th>
          <th style={{ width: "25%", textAlign: "center" }}>작성일자</th>
        </tr>

        {props.data.map((notice, _idx) => (
          <tr key={_idx}>
            <td style={{ textAlign: "center" }} data-th="#">
              {_idx + 1}
            </td>
            <td
              style={{ textAlign: "center", cursor: "pointer" }}
              data-th="제목"
              onClick={() =>
                handleOpenModal(notice?.id, notice?.title, notice?.content)
              }>
              {notice?.title}
            </td>
            <td style={{ textAlign: "center" }} data-th="작성일자">
              {notice?.createDate}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
