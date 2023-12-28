import { useState, useEffect } from "react";
import styled from "styled-components";
import { BoardRankType } from "@/types/board";
import { getDailyRanks, getMonthlyRanks, getWeeklyRanks } from "@api/boards";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { JustFlex, JustifyCenter } from "@styles/FlexBoxStlye";
import { useNavigate } from "react-router-dom";
import { initRankToggle } from "@/store/Toggle/RankingToggle";
import { isWithin24Hours } from "@/utils/Calculation";

function RankingBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isShow = useSelector((state: RootState) => state.RankToggle);
  const tabState = useSelector((state: RootState) => state.BoardRankTab);
  const [rankData, setRankData] = useState<BoardRankType[]>([]);

  const fetchRankData = async () => {
    if (tabState.daily) {
      try {
        const result = await getDailyRanks();
        setRankData(result);
      } catch (error) {
        console.error(error);
      }
    } else if (tabState.weekly) {
      try {
        const result = await getWeeklyRanks();
        setRankData(result);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const result = await getMonthlyRanks();
        setRankData(result);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchRankData();
  }, [tabState]);

  useEffect(() => {
    dispatch(initRankToggle());
  }, []);

  return (
    <JustifyCenter>
      {isShow.show ? (
        <RankBox>
          {rankData.length > 0 ? (
            <>
              <RankBoxLine>
                {rankData.slice(0, 5).map((data, index) => (
                  <JustFlex key={index}>
                    <p
                      className="text-underline-hover"
                      onClick={() => navigate(`/myError/${data?.id}`)}>
                      <strong>{index + 1}</strong>&nbsp;
                      {data?.title}
                    </p>
                    {isWithin24Hours(data?.write_date) ? (
                      <NewIcon src="/images/new.webp" alt="newIcon" />
                    ) : null}
                  </JustFlex>
                ))}
              </RankBoxLine>
              <DivisionLine />
              <RankBoxLine>
                {rankData.slice(5, 10).map((data, index) => (
                  <JustFlex key={index + 5}>
                    <p
                      className="text-underline-hover"
                      onClick={() => navigate(`/myError/${data?.id}`)}>
                      <strong>{index + 6}</strong>&nbsp;{data?.title}
                    </p>
                    {isWithin24Hours(data?.write_date) ? (
                      <NewIcon src="/images/new.webp" alt="newIcon" />
                    ) : null}
                  </JustFlex>
                ))}
              </RankBoxLine>
            </>
          ) : (
            <NoDataText>랭킹 데이터가 없습니다.</NoDataText>
          )}
        </RankBox>
      ) : null}
    </JustifyCenter>
  );
}

export default RankingBox;

const RankBox = styled.div`
  width: 85%;
  height: 16vh;
  background-color: #f3f1ec;
  position: relative;
  display: flex;
  padding-block: 1em;
  position: relative;
`;

const RankBoxLine = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  p {
    width: auto;
    margin-left: 1em !important;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    padding-right: 0.2em;
    strong {
      padding-inline: 0.4em;
      padding-block: 0.7em;
      color: red;
    }
  }
`;
const DivisionLine = styled.div`
  width: 0.1em;
  height: 100%;
  background-color: #555555;
  border-radius: 15px;
  opacity: 0.6;
`;

const NewIcon = styled.img`
  width: 1em;
  height: 1em;
  margin-bottom: 0.1em;
  margin-left: 0.2em;
`;

const NoDataText = styled.p`
  padding-inline: 2em;
`;
