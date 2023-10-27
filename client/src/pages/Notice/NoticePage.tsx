import BoardTable from "../../components/Table/BoardTable";
import { ContentBox, MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import { useEffect, useState } from "react";
import { NoticeTablePropType } from "../../types/TableTypes";
import axios from "../../api/axios";
import SpinnerOne from "../../components/Spinner";

export default function NoticePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<NoticeTablePropType[]>([]);

  // data Fetching
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/notice/notices");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <MainContainer>
      <PageHeader>공지사항</PageHeader>
      <ContentBox>
        {loading ? <SpinnerOne /> : <BoardTable data={data} />}
      </ContentBox>
    </MainContainer>
  );
}
