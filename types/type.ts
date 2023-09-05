import { ReactNode } from "react";
export interface Props {
  summary: ReactNode;
  children: ReactNode;
}

export interface OrderByCondition {
  orderBy: {
    date: "asc" | "desc";
  };
}
export interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
export interface MobileBanner {
  src: string;
  alt: string;
  title: string;
  href?: string;
  date?: string;
}
export interface PCBanner extends MobileBanner {}
export interface MutationResult {
  ok: boolean;
}
export interface BannerInfo {
  id?: number;
  src: string;
  date: string;
  replaceName?: string;
  href: string;
}
