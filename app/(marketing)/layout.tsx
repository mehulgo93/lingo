// in order for us to able to render the content inside the other page in this root folder, we need to use the Type Props and render the children which will in turn render the content in page.tsx

import { Footer } from "./footer";
import { Header } from "./header";

// the reason to create a layout page for this folder is to make a reusable layout that could be used to render the children and content inside this page

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    // the reason to create a header and other components inside this folder is as these components will only be rendered while we are rendering the content available on this page
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
