import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!process.env.COOKIE_NAME) {
    throw new Error("Invalid ENV for COOKIE_NAME");
  }

  const res = await request.json();

  const user = await db.user.create({
    data: {
      email: res.email,
      password: await hashPassword(res.password),
      firstName: res.firstName,
      lastName: res.lastName,
    },
  });

  const jwt = await createJWT(user);

  return NextResponse.json(
    { created: true },
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
