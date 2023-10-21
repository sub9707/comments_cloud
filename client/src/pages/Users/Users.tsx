import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    // 클린업 함수
    // 컴포넌트가 언마운트될 때 실행됨.
    // 구성 요소가 마운트 해제될 때 보류중인 요청을 취소한다.
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <article>
        <h2>유저 리스트</h2>
        {users?.length ? (
          <ul>
            {users.map((user, _idx) => (
              <li key={_idx}>hi</li>
            ))}
          </ul>
        ) : (
          <p>유저 데이터가 존재하지 않습니다.</p>
        )}
      </article>
    </>
  );
}
