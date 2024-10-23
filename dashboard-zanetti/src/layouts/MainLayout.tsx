import React from "react";
import { Sidebar } from "../components/Sidebar";
import Header from "@/layouts/Header";
import { Container } from "./container";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-gray-700">
      <Header title="Zanetti Dashboard" />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-200/80 overflow-auto h-[calc(100vh-73px)] p-1">
          <Container>{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
