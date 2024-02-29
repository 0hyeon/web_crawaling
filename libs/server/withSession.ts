import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
const cookieOptions = {
  cookieName: "gb_session",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    maxAge: 60 * 60 * 10, //10hour
  },
};

export function withApiSession(fn: any) {
  //api안에서 쿠키값을 저장하는 헬퍼함수
  return withIronSessionApiRoute(fn, cookieOptions);
}
export function withSsrSession(handler: any) {
  //ssr에서 쿠기값을 저장하는 헬퍼함수
  return withIronSessionSsr(handler, cookieOptions);
}
//클라이언트 측에서 쿠키를 사용하여 세션 데이터를 저장하고 관리합니다.
