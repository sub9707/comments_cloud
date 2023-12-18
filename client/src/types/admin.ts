import { Serie } from "@nivo/line";

export type boardCountType = {
  todayBoard: number;
  totalBoard: number;
};
export type repliesCountType = {
  todayReplies: number;
  totalReplies: number;
};
export type userCountDataType = {
  todayCount: number;
  totalCount: number;
};
export type userLoginDataType = {
  loginCount: number;
};
export type userGraphDataType = {
  data: Serie[];
  id: string;
  color: string;
};
