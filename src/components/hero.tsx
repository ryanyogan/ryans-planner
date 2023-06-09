import { getUserFromCookie } from "@/lib/auth";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { Button } from "./button";
import { Card } from "./card";

async function getData() {
  const user = await getUserFromCookie(cookies());
  return user;
}

export async function Hero({ user }: { user: User | null }) {
  if (!user) {
    user = await getData();
  }

  return (
    <Card className="w-full mt-6 py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user?.firstName}
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and shedule
        </h4>
      </div>
      <div>
        <Button size="large">Todays Schedule</Button>
      </div>
    </Card>
  );
}
