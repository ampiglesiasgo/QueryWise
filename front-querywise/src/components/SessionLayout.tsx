"use client"; 

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionLayoutProps {
  children: ReactNode;
}

const SessionLayout: React.FC<SessionLayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default SessionLayout;
