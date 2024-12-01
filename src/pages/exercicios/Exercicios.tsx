import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import InfoBar from "@/layouts/InfoBar";
import { DataTable } from "./components/data-table";
import { columns, Exercicio } from "./components/columns";
import api from "@/api";

export default function Exercicios() {
  const [data, setData] = useState<Exercicio[]>([]);
  const [loading, setLoading] = useState(true);

  async function getExercicios(): Promise<void> {
    try {
      const response = await api.get(`/exercicios`);
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter exercícios:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getExercicios();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div>
        <div className="flex flex-col w-full justify-end">
          <InfoBar
            pageTitle="Exercícios"
            pageDescription={`Gerencie os exercícios cadastrados`}
          />
          <div className="w-full">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
