import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GerenciarAluno from "@/pages/alunos/gerenciarAluno/GerenciarAluno";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/alunos",
    element: <GerenciarAluno />,
  },
]);

export default router;
