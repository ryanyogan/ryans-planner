import { Hero } from "@/components/hero";
import { HeroSkeleton } from "@/components/hero-skeleton";
import { Suspense } from "react";

function DashboardHome() {
  return (
    <div className="h-full overflow-y-auto pr-4 w-full">
      <div className="h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<HeroSkeleton />}>
            {/** @ts-ignore */}
            <Hero />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3">
          <div className="w-1/3 p-3">proj</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">tasks</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
