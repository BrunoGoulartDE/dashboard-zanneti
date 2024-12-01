import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./shared/routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer></ToastContainer>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7209B7",
        },
        components: {
          Button: {},
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </QueryClientProvider>
);
