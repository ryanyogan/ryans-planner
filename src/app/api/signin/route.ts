import { comparePssword, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!process.env.COOKIE_NAME) {
    throw new Error("Invalid ENV for COOKIE_NAME");
  }

  const res = await request.json();

  const user = await db.user.findUnique({
    where: {
      email: res.email as string,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid Login" }, { status: 401 });
  }

  const isUser = await comparePssword(res.password, user.password);

  if (isUser) {
    const jwt = await createJWT(user);
    return NextResponse.json(
      { status: "ok" },
      {
        status: 201,
        headers: {
          "Set-Cookie": serialize(process.env.COOKIE_NAME, jwt, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          }),
        },
      }
    );
  }

  return NextResponse.json({ error: "Invalid Login" }, { status: 401 });
}
