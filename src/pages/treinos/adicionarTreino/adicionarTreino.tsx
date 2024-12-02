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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
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
import { BiCheckCircle, BiXCircle } from "react-icons/bi";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedExercicio, setSelectedExercicio] = useState<Exercicio | null>(
    null
  );
  const [exercicioDetails, setExercicioDetails] = useState<ExercicioDetails>(
    {}
  );
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [alunoTreinos, setAlunoTreinos] = useState<any[]>([]);
  const [searchExercicio, setSearchExercicio] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

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
    obterExercicios();
  }, []);

  const handleAlunoSelect = async (value: string) => {
    const alunoID = parseInt(value);
    const aluno = alunos.find((a) => a.AlunoID === alunoID);
    setSelectedAluno(aluno || null);

    if (aluno) {
      try {
        const response = await api.get(`/treinos/${aluno.AlunoID}`);
        const treinoAluno = response.data.treinosSemana;
        setAlunoTreinos(treinoAluno);
      } catch (error) {
        console.error("Erro ao obter treino do aluno:", error);
      }
    }
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    // Load existing training for the selected day if any
    loadTrainingForSelectedDay(day);
  };

  const loadTrainingForSelectedDay = (day: string) => {
    if (alunoTreinos && alunoTreinos.length > 0) {
      const treinoDoDia = alunoTreinos.find(
        (treino) => treino.diaSemana === day
      );
      if (treinoDoDia) {
        const exerciciosDoDia = treinoDoDia.detalhesExercicios;
        const newSelectedTreino = exerciciosDoDia.map((exercicio: any) => ({
          ExercicioID: exercicio.ExercicioID,
          NomeExercicio: exercicio.NomeExercicio,
        }));
        setSelectedTreino(newSelectedTreino);

        const newExercicioDetails: ExercicioDetails = {};
        exerciciosDoDia.forEach((exercicio: any) => {
          newExercicioDetails[exercicio.ExercicioID] = {
            series: exercicio.Sets,
            reps: exercicio.Reps,
            observacoes: exercicio.ObservacoesExercicioTreino,
          };
        });
        setExercicioDetails(newExercicioDetails);
      } else {
        setSelectedTreino([]);
        setExercicioDetails({});
      }
    } else {
      setSelectedTreino([]);
      setExercicioDetails({});
    }
  };

  const openExercicioDialog = (exercicio: Exercicio) => {
    setDialogOpen(true);
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
    if (selectedExercicio && selectedExercicio.ExercicioID) {
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
    setSelectedTreino((prev) => {
      const exercicioExistente = prev.find(
        (e) => e.ExercicioID === exercicio.ExercicioID
      );

      if (exercicioExistente) {
        return prev.filter((e) => e.ExercicioID !== exercicio.ExercicioID);
      } else {
        return [...prev, exercicio];
      }
    });

    setExerciciosSalvos((prevExercicios: ExercicioTreino[]) => {
      const exercicioExistente = prevExercicios.find(
        (e) => e.ExercicioID === exercicio.ExercicioID
      );

      if (exercicioExistente) {
        return prevExercicios.filter(
          (e) => e.ExercicioID !== exercicio.ExercicioID
        );
      } else {
        const exercicioDetail = exercicioDetails[exercicio.ExercicioID] || {};
        const exercicioSalvo: ExercicioTreino = {
          ExercicioID: exercicio.ExercicioID,
          NomeExercicio: exercicio.NomeExercicio || "Exercício sem nome",
          series: exercicioDetail.series || "0",
          reps: exercicioDetail.reps || "0",
          observacoes: exercicioDetail.observacoes || "Sem Observações",
        };

        return [...prevExercicios, exercicioSalvo];
      }
    });
  };

  const saveExercicioDetails = () => {
    if (!selectedExercicio || !selectedExercicio.ExercicioID) {
      console.error("Nenhum exercício selecionado.");
      return;
    }

    const exercicioDetail =
      exercicioDetails[selectedExercicio.ExercicioID] || {};

    const exercicioSalvo: ExercicioTreino = {
      ExercicioID: selectedExercicio.ExercicioID,
      NomeExercicio: selectedExercicio.NomeExercicio || "Exercício sem nome",
      series: exercicioDetail.series || "0",
      reps: exercicioDetail.reps || "0",
      observacoes: exercicioDetail.observacoes || "Sem Observações",
    };

    setExerciciosSalvos((prevExercicios: ExercicioTreino[]) => {
      const exercicioExistente = prevExercicios.find(
        (e) => e.ExercicioID === selectedExercicio.ExercicioID
      );

      let updatedExercicios: ExercicioTreino[];
      if (exercicioExistente) {
        updatedExercicios = prevExercicios.map((e) =>
          e.ExercicioID === selectedExercicio.ExercicioID ? exercicioSalvo : e
        );
      } else {
        updatedExercicios = [...prevExercicios, exercicioSalvo];
      }

      console.log("Estado atualizado de exerciciosSalvos:", updatedExercicios);

      return updatedExercicios;
    });

    setDialogOpen(false);
  };

  const saveTreino = async () => {
    if (!selectedAluno || !selectedAluno.AlunoID) {
      alert("Selecione um aluno");
      return;
    }

    if (!selectedDay) {
      alert("Selecione um dia");
      return;
    }

    if (selectedTreino.length === 0) {
      alert("Selecione pelo menos um exercício para o treino");
      return;
    }

    const novoTreino = {
      diaSemana: selectedDay,
      DataInicio: "2023-12-20 00:00:00.000",
      DataConclusao: "2024-01-04 00:00:00.000",
      EstadoTreino: "Em andamento",
      aluno: { AlunoID: selectedAluno.AlunoID },
      exercicios: selectedTreino.map((exercicio) => ({
        ExercicioID: exercicio.ExercicioID,
        NomeExercicio: exercicio.NomeExercicio,
        ...exercicioDetails[exercicio.ExercicioID],
      })),
    };

    try {
      console.log("Enviando treino para o backend:", novoTreino);
      const response = await api.post("/treinos", novoTreino);
      console.log("Treino adicionado com sucesso:", response.data);

      const treinoID = response.data?.TreinoID;
      const exerciciosTreinos = novoTreino.exercicios.map((exercicio) => ({
        exercicio: exercicio.ExercicioID,
        treino: treinoID,
        Sets: exercicio.series || 0,
        Reps: exercicio.reps || 0,
        Observacoes: exercicio.observacoes || "",
        Carga: 0,
      }));

      console.log(
        "Enviando exercícios do treino para o backend:",
        exerciciosTreinos
      );
      await api.post("/exerciciosTreino", exerciciosTreinos);
    } catch (error) {
      console.error("Erro ao adicionar treino:", error);
    }
  };

  const exerciciosFiltrados = exercicios.filter((exercicio) => {
    if (
      categoriaFiltro &&
      exercicio.Categoria.toLowerCase() !== categoriaFiltro.toLowerCase()
    ) {
      return false;
    }
    if (
      searchExercicio &&
      !exercicio.NomeExercicio.toLowerCase().includes(
        searchExercicio.toLowerCase()
      )
    ) {
      return false;
    }
    return true;
  });

  const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

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
            <Select onValueChange={handleAlunoSelect}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Alunos">
                  {selectedAluno ? selectedAluno.Nome : "Alunos"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {alunos.map((aluno) => (
                  <SelectItem
                    key={aluno.AlunoID}
                    value={aluno.AlunoID.toString()}
                  >
                    {aluno.Nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="flex flex-row gap-2">
              {daysOfWeek.map((day) => {
                const hasTreino = alunoTreinos.some(
                  (treino) => treino.diaSemana === day
                );
                return (
                  <button
                    key={day}
                    onClick={() => handleDaySelect(day)}
                    className={`p-2 rounded ${
                      selectedDay === day
                        ? "bg-[#FFB744] text-white"
                        : hasTreino
                        ? "bg-gray-400"
                        : "bg-gray-100"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
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
                      <div key={exercicio.ExercicioID}>
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
                              {exercicioDetails[exercicio.ExercicioID]?.reps ||
                                0}
                            </div>
                          </div>
                        </div>

                        <AlertDialog open={dialogOpen}>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Editar Exercício
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Configure as séries, repetições e observações
                                para este exercício.
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
                              <AlertDialogCancel
                                className="bg-white border-2 border-gray-300 text-[#7209B7] px-4 py-2 rounded-md flex items-center space-x-2"
                                onClick={() => setDialogOpen(false)}
                              >
                                <BiXCircle />
                                <span>Cancelar</span>
                              </AlertDialogCancel>

                              <Button
                                onClick={saveExercicioDetails}
                                className="bg-color text-black"
                              >
                                <BiCheckCircle />
                                Salvar
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="w-1/2">
                <CardContent>
                  <CardHeader>
                    <CardTitle>Lista de Exercícios</CardTitle>
                  </CardHeader>
                  <input
                    type="text"
                    placeholder="Buscar exercício"
                    value={searchExercicio}
                    onChange={(e) => setSearchExercicio(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <Select onValueChange={(value) => setCategoriaFiltro(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Abdômen">Abdômen</SelectItem>
                      <SelectItem value="Perna">Perna</SelectItem>
                      <SelectItem value="Bíceps">Bíceps</SelectItem>
                      <SelectItem value="Abdômen">Abdômen</SelectItem>
                      <SelectItem value="Peito">Peito</SelectItem>
                      <SelectItem value="Costas">Costas</SelectItem>
                      <SelectItem value="Tríceps">Tríceps</SelectItem>
                      <SelectItem value="Ombro">Ombros</SelectItem>
                    </SelectContent>
                  </Select>
                  {loading ? (
                    <p>Carregando...</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      {exerciciosFiltrados.map((exercicio) => (
                        <div
                          key={exercicio.ExercicioID}
                          onClick={() => handleSelectExercicio(exercicio)}
                          className={`p-2 rounded-lg cursor-pointer ${
                            selectedTreino.some(
                              (e: Exercicio) =>
                                e.ExercicioID === exercicio.ExercicioID
                            )
                              ? "bg-[#FFB744] text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          {exercicio.NomeExercicio}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          <Button onClick={saveTreino}>Salvar Treino</Button>
        </div>
      </div>
    </MainLayout>
  );
}
