// reason again for creating a layout file is to make a reusable component for this part of the page
// the upper part of the folder is always in parenthises because we don't want it to show up in the link
// by defaul the tailwind classes work on mobile devices to make any changes in the web version or larger devices you need to mention the "lg" key

import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
