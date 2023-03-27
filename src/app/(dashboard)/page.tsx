import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero-skeleton";
import { ProjectCard } from "@/components/project-card";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

async function getData() {
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects, user };
}

export default async function DashboardHome() {
  const { projects, user } = await getData();

  return (
    <div className="h-full overflow-y-auto pr-4 w-full">
      <div className="h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<HeroSkeleton />}>
            {/** @ts-ignore */}
            <Hero user={user} />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3">
          {projects.map((project) => (
            <div className="w-1/3 p-3" key={project.id}>
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">tasks</div>
        </div>
      </div>
    </div>
  );
}
