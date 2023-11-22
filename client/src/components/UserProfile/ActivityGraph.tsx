import { useState } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import data from "./calendarTempData.json";
import { JustifyStart } from "../../styles/FlexBoxStlye";
import styled from "styled-components";

function ActivityGraph() {
  const [year, setYear] = useState<number>(2015);
  return (
    <div style={{ width: "100%", height: "20vh" }}>
      <JustifyStart>
        <YearButton onClick={() => setYear(2015)}>2015 &nbsp;</YearButton>
        <YearButton onClick={() => setYear(2016)}>2016 &nbsp;</YearButton>
        <YearButton onClick={() => setYear(2017)}>2017 &nbsp;</YearButton>
      </JustifyStart>
      <ResponsiveCalendar
        data={data}
        from={`${year}-01-01`}
        to={`${year}-12-31`}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        // margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
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
