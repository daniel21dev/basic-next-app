import { NextUIProvider } from "@nextui-org/react";
import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NextUIProvider>{children}</NextUIProvider>
    </div>
  );
};
