"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Grid, Settings, User } from "react-feather";

const icons = { Settings, User, Grid, Calendar };

export function SidebarLink({
  link,
}: {
  link: { link: string; label: string; icon: string };
}) {
  const path = usePathname();
  let isActive = false;

  if (path === link.link) {
    isActive = true;
  }

  // @ts-ignore
  const Icon = icons[link.icon];

  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
}
