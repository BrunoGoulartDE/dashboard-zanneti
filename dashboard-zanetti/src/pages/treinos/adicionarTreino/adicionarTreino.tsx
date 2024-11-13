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

interface ExercicioDetails {
  [key: number]: {
    series: string;
    reps: string;
    observacoes: string;
  };
}

interface ExercicioTreino {
  ExercicioID: number;
  NomeExercicio: string;
  series: string;
  reps: string;
  observacoes: string;
}

export default function AdicionarTreinos() {
  const [, setExerciciosSalvos] = useState<ExercicioTreino[]>([]);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTreino, setSelectedTreino] = useState<Exercicio[]>([]);
  const [series] = useState("");
  const [reps] = useState("");
  const [observacoes] = useState("");
  const [selectedExercicio, setSelectedExercicio] = useState<Exercicio | null>(
    null
  );

  const [exercicioDetails, setExercicioDetails] = useState<ExercicioDetails>(
    {}
  );

  const obterExercicios = async () => {
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
    obterExercicios();
  }, []);

  const openExercicioDialog = (exercicio: Exercicio) => {
    setSelectedExercicio(exercicio);
    setExercicioDetails((prev) => ({
      ...prev,
      [exercicio.ExercicioID]: {
        series: prev[exercicio.ExercicioID]?.series || "",
        reps: prev[exercicio.ExercicioID]?.reps || "",
        observacoes: prev[exercicio.ExercicioID]?.observacoes || "",
      },
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    if (selectedExercicio) {
      setExercicioDetails((prev) => ({
        ...prev,
        [selectedExercicio.ExercicioID]: {
          ...prev[selectedExercicio.ExercicioID],
          [field]: value,
        },
      }));
    }
  };

  const handleSelectExercicio = (exercicio: Exercicio) => {
    setSelectedTreino((prev) =>
      prev.some((e) => e.ExercicioID === exercicio.ExercicioID)
        ? prev.filter((e) => e.ExercicioID !== exercicio.ExercicioID)
        : [...prev, exercicio]
    );
  };

  const saveExercicioDetails = () => {
    const exercicioSalvo: ExercicioTreino = {
      ExercicioID: selectedExercicio?.ExercicioID || 0,
      NomeExercicio: selectedExercicio?.NomeExercicio || "",
      series,
      reps,
      observacoes,
    };
    setExerciciosSalvos((prevExercicios: ExercicioTreino[]) => {
      const updatedExercicios = [...prevExercicios, exercicioSalvo];
      console.log("Estado atualizado:", updatedExercicios);
      return updatedExercicios;
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
              {/* Card Treino do Dia */}
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
                            className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 flex justify-between items-center"
                          >
                            <span>{exercicio.NomeExercicio}</span>
                            <div className="coluna-numeros flex gap-2 text-sm text-gray-600">
                              <div className="set font-bold border px-2 py-1 rounded-md border-gray-400">
                                Sets:{" "}
                                {exercicioDetails[exercicio.ExercicioID]
                                  ?.series || 0}
                              </div>
                              <div className="rep font-bold border px-2 py-1 rounded-md border-gray-400">
                                Reps:{" "}
                                {exercicioDetails[exercicio.ExercicioID]
                                  ?.reps || 0}
                              </div>
                            </div>
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
                                value={
                                  exercicioDetails[exercicio.ExercicioID]
                                    ?.series || ""
                                }
                                onChange={(e) =>
                                  handleInputChange("series", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label>Reps</label>
                              <input
                                type="number"
                                value={
                                  exercicioDetails[exercicio.ExercicioID]
                                    ?.reps || ""
                                }
                                onChange={(e) =>
                                  handleInputChange("reps", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label>Observações</label>
                              <textarea
                                value={
                                  exercicioDetails[exercicio.ExercicioID]
                                    ?.observacoes || ""
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "observacoes",
                                    e.target.value
                                  )
                                }
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
                          className={`p-2 rounded-lg ${
                            selectedTreino.some(
                              (e: Exercicio) =>
                                e.ExercicioID === exercicio.ExercicioID
                            )
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100"
                          }`}
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
