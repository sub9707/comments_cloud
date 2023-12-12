import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatRelativeTime } from "../../utils/Calculation";
import { useNavigate } from "react-router-dom";

function LikedNoteList() {
  const listData = useSelector(
    (state: RootState) => state.LikedBoardListSlice.data
  );
  const navigate = useNavigate();
  return (
    <table className="table table-sm text-center">
      <thead>
        <tr>
          <th style={{ width: "70%" }}>게시글 명</th>
          <th style={{ width: "20%" }}>닉네임</th>
          <th style={{ width: "10%" }}>좋아요</th>
        </tr>
      </thead>
      <tbody>
        {listData.length > 0 ? (
          listData.map((data, _idx) => (
            <tr key={_idx}>
              <td
                className="text-underline-hover"
                onClick={() => navigate(`/myError/${data?.id}`)}>
                {data?.title}
              </td>
              <td
                className="text-underline-hover"
                onClick={() => navigate(`/user/${data?.writer_id}`)}>
                {data?.nickname}
              </td>
              <td>{formatRelativeTime(data?.like_date)}</td>
            </tr>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </tbody>
    </table>
  );
}

export default LikedNoteList;
