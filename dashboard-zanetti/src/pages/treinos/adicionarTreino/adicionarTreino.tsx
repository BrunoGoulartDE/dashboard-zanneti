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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
  const [selectedExercicios, setSelectedExercicios] = useState<number[]>([]);
  const [selectedTreino, setSelectedTreino] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedExercicio, setSelectedExercicio] = useState<Exercicio>(null);
  const [series, setSeries] = useState("");
  const [reps, setReps] = useState("");
  const [observacoes, setObservacoes] = useState("");

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
  const openExercicioDialog = (exercicio) => {
    setSelectedExercicio(exercicio);
    setSeries("");
    setReps("");
    setObservacoes("");
  };
  const handleSelectExercicio = (exercicio) => {
    setSelectedTreino((prev) =>
      prev.some((e) => e.ExercicioID === exercicio.ExercicioID)
        ? prev.filter((e) => e.ExercicioID !== exercicio.ExercicioID)
        : [...prev, exercicio]
    );
  };

  const saveExercicioDetails = () => {
    console.log("Salvando:", {
      NomeExercicio: selectedExercicio?.NomeExercicio,
      series,
      reps,
      observacoes,
    });
    setSelectedExercicio(null);
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
            <ToggleGroup type="single">
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
                      Clique em um exercício para editar.
                    </CardDescription>
                  </CardHeader>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {selectedTreino.map((exercicio: Exercicio) => (
                      <AlertDialog
                        key={exercicio.ExercicioID}
                        open={selectedExercicio === exercicio}
                      >
                        <AlertDialogTrigger asChild>
                          <div
                            onClick={() => openExercicioDialog(exercicio)}
                            className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100"
                          >
                            {exercicio.NomeExercicio}
                          </div>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Editar Exercício
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Configure as séries, repetições e observações para
                              este exercício.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <div className="flex flex-col gap-4">
                            <div>
                              <label>Sets</label>
                              <input
                                type="number"
                                value={series}
                                onChange={(e) => setSeries(e.target.value)}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label>Reps</label>
                              <input
                                type="number"
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label>Observações</label>
                              <textarea
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                className="w-full p-2 border rounded"
                              ></textarea>
                            </div>
                          </div>

                          <AlertDialogFooter>
                            <Button onClick={() => setSelectedExercicio(null)}>
                              Cancelar
                            </Button>
                            <Button
                              onClick={saveExercicioDetails}
                              className="bg-blue-500 text-white"
                            >
                              Salvar
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="w-1/2">
                <CardContent>
                  <CardHeader>
                    <CardTitle>Lista de Exercícios</CardTitle>
                    <CardDescription>
                      Clique em um exercício para adicionar ao treino.
                    </CardDescription>
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
                          onClick={() => handleSelectExercicio(exercicio)}
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
