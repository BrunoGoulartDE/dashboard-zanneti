import MainLayout from "@/layouts/MainLayout";
import { columns, Aluno } from "./components/columns";
import { DataTable } from "./components/data-table";
import InfoBar from "@/layouts/InfoBar";
import api from "@/api";
import { useEffect, useState } from "react";

const GerenciarAluno = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  const obterAlunos = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/aluno`);
      console.log(response.data);
      setAlunos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter alunos:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    obterAlunos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div>
        <div className="flex flex-col w-full justify-end">
          <InfoBar
            pageTitle="Gerenciar alunos"
            pageDescription={`Gerencie seus alunos`}
          ></InfoBar>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={alunos} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GerenciarAluno;
