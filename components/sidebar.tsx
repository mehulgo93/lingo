// usually the best way to figure out where to put the components is to sketch out the webpage and then create components and then decide where to put the components

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex bg-blue-500 h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      Sidebar
    </div>
  );
};
