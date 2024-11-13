import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import InfoBar from "@/layouts/InfoBar";
import { Aluno } from "@/types/Aluno";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import api from "@/api";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Exercicio {
  ExercicioID: number;
  NomeExercicio: string;
  Observacoes: string;
  Categoria: string;
}

export default function AdicionarTreinos() {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExercicios, setSelectedExercicios] = useState<number[]>([]); // Define o tipo como number[]

  const getExercicios = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/exercicios`);
      setExercicios(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter exercícios:", error);
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getExercicios();
  }, []);

  const handleToggle = (value: number) => {
    setSelectedExercicios((prev) =>
      prev.includes(value)
        ? prev.filter((ex) => ex !== value)
        : [...prev, value]
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-col w-full justify-end">
        <InfoBar
          pageTitle="Treinos"
          pageDescription="Cadastre um novo treino"
        />
        <div className=" flex flex-col  gap-2 p-4">
          <div className="flex flex-col gap-1">
            {" "}
            <Label>Escolha um aluno para iniciar:</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Alunos" />
              </SelectTrigger>
              <SelectContent>
                {alunos.map((aluno) => (
                  <SelectItem key={aluno.Nome} value={aluno.Nome}>
                    {aluno.Nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <ToggleGroup type="multiple">
              <ToggleGroupItem value="Seg">Seg</ToggleGroupItem>
              <ToggleGroupItem value="Ter">Ter</ToggleGroupItem>
              <ToggleGroupItem value="Qua">Qua</ToggleGroupItem>
              <ToggleGroupItem value="Qui">Qui</ToggleGroupItem>
              <ToggleGroupItem value="Sex">Sex</ToggleGroupItem>
              <ToggleGroupItem value="Sáb">Sáb</ToggleGroupItem>
              <ToggleGroupItem value="Dom">Dom</ToggleGroupItem>
            </ToggleGroup>
            <div className="flex flex-row gap-4">
              <Card className="w-1/2">
                <CardContent>
                  <CardHeader>
                    <CardTitle>Treino do dia</CardTitle>
                    <CardDescription>
                      Escolha os exercícios para hoje.
                    </CardDescription>
                  </CardHeader>
                </CardContent>
              </Card>
              <Card className="w-1/2">
                <CardContent>
                  <CardHeader>
                    <CardTitle>Lista de Exercícios</CardTitle>
                  </CardHeader>
                  {loading ? (
                    <p>Carregando...</p>
                  ) : (
                    <ToggleGroup
                      type="multiple"
                      className="grid grid-cols-1 gap-2"
                    >
                      {exercicios.map((exercicio) => (
                        <ToggleGroupItem
                          key={exercicio.ExercicioID}
                          value={exercicio.NomeExercicio}
                          onClick={() => handleToggle(exercicio.ExercicioID)}
                        >
                          {exercicio.NomeExercicio}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
