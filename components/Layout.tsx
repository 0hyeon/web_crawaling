import React, { ReactNode } from "react";
import MenubarLeft from "./MenubarLeft";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6]">
        <div className="min-h-[100vh] bg-white">
          <MenubarLeft />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
