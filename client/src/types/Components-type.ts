import { IconProp } from "@fortawesome/fontawesome-svg-core";

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

export type PublicBadgeType = {
  ispublic: string;
};

export type ServiceDataType = {
  title: string;
  subtitle: string;
  list: string[];
};
export type ServiceInfoDataType = {
  title: string;
  subtitle: string;
  delay: number;
  iconType: IconProp;
};
