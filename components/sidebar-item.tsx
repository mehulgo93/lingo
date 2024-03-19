"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

// the type of props always comes from the type of information you want to display in this case for example we want to display the label, icon, and we want to add a link to each of the sidebar item

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

export const SidebarItem = ({ label, iconSrc, href }: Props) => {
  const pathname = usePathname(); // The primary use of usePathname is to get the pathname of the URL of the current page. This can be particularly useful for functionality that depends on knowing the current route, such as highlighting the active link in a navigation bar, or rendering different components based on the current route.
  const active = pathname === href; // this is done in order to check whether we are active or not

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          width={32}
          height={32}
        />
        {label}
      </Link>
    </Button>
  );
};
