import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function delUser({id}:{id:number}) {
    console.log("id :",id)
  try {
    const res = await prisma.user.delete({
        where:{
            id: id
        }
    })
    return res
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = Number(req.body.id); // DELETE 요청으로 받은 ID
    console.log("del-ser-id :",req.body)
    try {
      const deletedUser = await delUser({id});
      console.log("deletedUser : ",deletedUser)
      res.json({ deletedUser, errors: {message:"존재하지 않는계정입니다"}});
    } catch (error) {
        res.json({ errors: {message:"존재하지 않는계정입니다"}});
    }
  
}