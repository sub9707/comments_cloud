import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #333;
  border-radius: 0.4em;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  tr {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: white;
    border-color: #bfbfbf;
  }
  tr:first-child {
    border-top: none;
    background: #7c81ad;
    color: #fff;
  }
  th {
    display: none;
  }
  td {
    display: block;
  }
  td:first-child {
    margin-top: 0.5em;
  }

  td:last-child {
    margin-bottom: 0.5em;
  }

  td:before {
    content: attr(data-th) ": ";
    font-weight: bold;
    width: 120px;
    display: inline-block;
    color: #000;
  }

  th,
  td {
    text-align: left;
    padding: 0.5em 1em;
  }
  @media screen and (max-width: 601px) {
    tr:nth-child(2) {
      border-top: none;
    }
    tr {
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 2px 6px 2px !important;
    }
  }
  @media screen and (min-width: 600px) {
    tr:hover:not(:first-child) {
      background-color: #d8e7f3;
    }
    td:before {
      display: none;
    }
    th,
    td {
      display: table-cell;
      padding: 0.25em 0.5em;
    }
    th:first-child,
    td:first-child {
      padding-left: 0;
    }
    th:last-child,
    td:last-child {
      padding-right: 0;
    }
    th,
    td {
      padding: 1em !important;
    }
  }
`;

export const RuleHead = styled.th`
  width: 5%;
  text-align: center;
`;

export const SolvedArea = styled.div`
  display: flex;
  width: 20%;
  margin-left: 1em;
  align-items: center;
`;
export const ErrorTableHead = styled.th`
  text-align: center;
  font-weight: 200 !important;
  color: #9a9c9a !important;
  &:nth-child(1) {
    width: 45%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  &:nth-child(2) {
    width: 15%;
  }
  &:nth-child(3) {
    width: 8%;
  }
  &:nth-child(4),
  &:nth-child(5) {
    width: 10%;
  }

  &:nth-child(6),
  &:nth-child(7) {
    width: 6%;
  }
`;

export const ErrorTableData = styled.td`
  text-align: center;
  font-weight: 200 !important;
  height: 2.4em !important;
  &:nth-child(1) {
    max-width: 150px;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    word-break: break-all !important;
    white-space: nowrap !important;
  }
  &:nth-child(4) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
