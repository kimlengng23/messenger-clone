import NextAuth, { AuthOptions } from "next-auth";
import { authOptions } from "@/app/libs/auth";

const handler = NextAuth(authOptions);
export const GET = handler.handlers.GET;
export const POST = handler.handlers.POST;