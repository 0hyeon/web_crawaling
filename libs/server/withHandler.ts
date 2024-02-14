import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
type method = "GET" | "POST" | "DELETE";

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}
export default function withHandler({
  methods,
  isPrivate = false, //인증이 필요한가? true > ok
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      //예를 들어, methods 배열이 ["GET", "POST"]로 설정되어 있고, 클라이언트가 "DELETE" 메서드로 요청을 보낸 경우, 이 코드는 405 상태 코드를 반환하여 클라이언트에게 해당 메서드는 허용되지 않음
      return res.status(405).end();
    }
    // console.log("req.session.user1 : ", req.session.user);
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Plz log in." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
