import { ReactNode } from "react";
export interface Props {
  summary: ReactNode;
  children: ReactNode;
}
export interface IToDoState {
  [key: string]: string[];
}
export interface OrderByCondition {
  orderBy: {
    date: "asc" | "desc";
  };
}
export interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: any;
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
  errors?: { message: string };
  [key: string]: any;
}
export interface BannerInfo {
  id?: number;
  src: string;
  date: string;
  replaceName?: string;
  href: string;
}
export interface IJobkoAppsData{
  id?:number;      
  Category?:string
  AttributedTouchType?:string
  AttributedTouchTime?:string
  InstallTime?:string
  EventTime?:string
  EventName?:string
  Partner?:string | null
  MediaSource?:string
  Channel?:string
  Keywords?:string
  Campaign?:string
  Adset?:string
  Ad?:string
  AdType?:string
  Region?:string
  CountryCode?:string
  Carrier?:string
  Language?:string
  AppsFlyerID?:string
  AndroidID?:string
  AdvertisingID?:string
  IDFA?:string
  IDFV?:string
  DeviceCategory?:string
  Platform?:string
  OSVersion?:string
  AppVersion?:string
  SDKVersion?:string
  IsRetargeting?:any
  RetargetingConversionType?:string
  IsPrimaryAttribution?:any
  AttributionLookback?:string
  ReengagementWindow?:string
  MatchType?:string
  UserAgent?:string
  ConversionType?:string
  CampaignType?:string
  DeviceModel?:string
  KeywordID?:string
  PivotTime?:string
}
export interface ChannelInfo {
  id: number;
  channel: string;
  media: string;
  onOff: boolean;
}