// import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
// import { useEffect, useState } from "react";

// // import credential from '..App/';

// // 구글 시트 조회하는 로직
// export const getGoogleSheet: () => Promise<GoogleSpreadsheet> = async () => {
//   const doc = new GoogleSpreadsheet();
//   // 구글 인증이 필요하다.
//   await doc.useServiceAccountAuth(credential);
//   await doc.loadInfo();
//   return doc;
// };

// // 구글 시트 조회하는 custom useHook
// const useGoogleSheet = (sheetId: string) => {
//   const [googleSheetRows, setGoogleSheetRows] = useState<
//     GoogleSpreadsheetRow[]
//   >([]);

//   const fetchGoogleSheetRows = async () => {
//     const googleSheet = await getGoogleSheet();
//     const sheetsByIdElement = googleSheet.sheetsById[sheetId];
//     const rows = await sheetsByIdElement.getRows();
//     setGoogleSheetRows(rows);
//   };

//   useEffect(() => {
//     fetchGoogleSheetRows();
//   }, []);

//   return [googleSheetRows];
// };

// export default useGoogleSheet;
