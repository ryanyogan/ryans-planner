import { TaskCard } from "@/components/task-card";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

async function getData(id: string) {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id, userId: user?.id },
    include: {
      tasks: true,
    },
  });

  return { project };
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { project } = await getData(params.id);

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      {/** @ts-ignore */}
      <TaskCard tasks={project?.tasks} title={project?.name} />
    </div>
  );
}
