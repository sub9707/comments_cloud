export type CardDataType = {
  title: string;
  content: string;
  link: string;
};

export type DesktopCardDataType = {
  title: string;
  content: string;
  ImgUrl: string;
  link: string;
};

export type PaginationCompProps = {
  active: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
};
