import { useEffect, useState } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { JustifyStart } from "@styles/FlexBoxStlye";
import styled from "styled-components";
import { getCalendarData } from "@api/user";

type CalendarData = {
  day: string;
  value: number;
};
function ActivityGraph(props: { userId: string }) {
  const [data, setCalendarData] = useState<CalendarData[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [years, setYears] = useState<number[]>([]);

  const getYearsArray = (data: CalendarData[]) => {
    if (data.length > 1) {
      const startYear = new Date(data[0].day).getFullYear();
      const endYear = new Date(data[data.length - 1].day).getFullYear();
      return startYear === endYear
        ? [startYear]
        : Array.from(
            { length: endYear - startYear + 1 },
            (_, index) => startYear + index
          );
    } else if (data.length === 1) {
      return [new Date(data[0].day).getFullYear()];
    } else {
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getCalendarData(props.userId);
        setCalendarData(response);
        setYears(getYearsArray(response));
      } catch (err) {
        console.error(err);
        throw new Error("사용자 노트 달력 조회 오류: AXIOS");
      }
    })();
  }, []);

  return (
    <div style={{ width: "100%", height: "20vh" }}>
      <JustifyStart>
        {years.map((y) => (
          <YearButton
            style={{ fontWeight: y === year ? 800 : 500 }}
            key={y}
            onClick={() => setYear(y)}>
            {y}
          </YearButton>
        ))}
      </JustifyStart>
      <ResponsiveCalendar
        data={data}
        from={`${year}-01-01`}
        to={`${year}-12-31`}
        emptyColor="#eeeeee"
        colors={["#b8b4ee", "#9a93e9", "#453f9c", "#352f80"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        maxValue="auto"
        minValue={2}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
}

export default ActivityGraph;

const YearButton = styled.p`
  font-size: 1em;
  margin-inline: 1em;
  margin-block: 1em 0;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;
