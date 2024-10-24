import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GerenciarAluno from "@/pages/alunos/gerenciarAluno/GerenciarAluno";
import Exercicios from "@/pages/exercicios/Exercicios";
import AdicionarExercicios from "@/pages/exercicios/adicionarExercicio/AdicionarExercicios";

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
  {
    path: "/exercicios",
    element: <Exercicios />,
  },
  {
    path: "/exercicio/adicionar",
    element: <AdicionarExercicios />,
  },
]);

export default router;
