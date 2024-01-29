import { formatRelativeTime } from "@utils/Calculation";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLikedList } from "@api/user";

type LikedNoteListType = {
  id: number;
  title: string;
  writer_id: string;
  nickname: string;
  like_date: string;
};

function LikedNoteList() {
  const [listData, setListData] = useState<LikedNoteListType[]>([]);
  const { userId } = useParams();

  const clickRouteHandler = (id: string) => {
    navigate(`/user/${id}`);
    navigate(0);
  };

  useEffect(() => {
    const fetchListData = async () => {
      const response = await fetchLikedList(userId!, 0);
      const result = response.data;
      setListData(result);
    };
    fetchListData();

    return () => {
      fetchListData();
    };
  }, []);
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
                onClick={() => clickRouteHandler(data?.writer_id)}>
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
