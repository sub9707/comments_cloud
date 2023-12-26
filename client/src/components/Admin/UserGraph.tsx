import styled from "styled-components";
import { ResponsiveLine } from "@nivo/line";
import { userGraphDataType } from "@/types/admin";

type graphpropsType = {
  graphdata: userGraphDataType[];
  legendName: string;
};

function UserGraph(props: graphpropsType) {
  return (
    <GraphContainer>
      <ResponsiveLine
        data={props?.graphdata}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat={(value) => `${value}명`}
        curve="cardinal"
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `${props.legendName}`,
          legendOffset: -40,
          legendPosition: "middle",
          tickValues: 1,
        }}
        enableGridX={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        colors={`${props?.graphdata[0]?.color}`}
      />
    </GraphContainer>
  );
}

export default UserGraph;

const GraphContainer = styled.div`
  width: 90%;
  height: 40vh;
  border: 2px solid #888888;
  border-radius: 15px;
  display: flex;
  justify-content: center;
`;
