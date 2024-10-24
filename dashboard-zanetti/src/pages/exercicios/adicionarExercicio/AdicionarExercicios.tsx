import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/layouts/MainLayout";
import InfoBar from "@/layouts/InfoBar";
import { Button } from "@/components/ui/button";
import { BiPlusCircle } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = "http://191.101.70.68:3000";

interface Exercicio {
  ExercicioID: number;
  NomeExercicio: string;
  Observacoes: string;
  Categoria: string;
}

export default function AdicionarExercicios() {
  const [data, setData] = useState<Exercicio[]>([]);
  const [loading, setLoading] = useState(false);
  const [novoExercicio, setNovoExercicio] = useState({
    NomeExercicio: "",
    Categoria: "",
    Observacoes: "",
    VideoExecucao: "",
  });

  const getExercicios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/exercicios`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter exercícios:", error);
      setLoading(false);
    }
  };

  const addExercicio = async () => {
    if (novoExercicio.NomeExercicio && novoExercicio.Categoria) {
      setLoading(true);

      const newId = data.length
        ? Math.max(...data.map((e) => e.ExercicioID)) + 1
        : 1;
      const novoExercicioData = { ExercicioID: newId, ...novoExercicio };

      try {
        const response = await axios.post(
          `${API_URL}/exercicios`,
          novoExercicioData
        );
        console.log("Exercício adicionado no servidor:", response.data);

        setData((prev) => [...prev, response.data]);
        setNovoExercicio({
          NomeExercicio: "",
          Categoria: "",
          Observacoes: "",
          VideoExecucao: "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao adicionar exercício:", error);
        setLoading(false);
      }
    } else {
      console.error("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoExercicio((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    getExercicios();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col w-full justify-end">
        <InfoBar
          pageTitle="Exercícios"
          pageDescription="Gerencie os exercícios cadastrados"
        />
        <div className="p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addExercicio();
            }}
          >
            <div className="mb-4">
              <Label htmlFor="nome">Nome:</Label>
              <Input
                id="nome"
                type="text"
                name="NomeExercicio"
                value={novoExercicio.NomeExercicio}
                onChange={handleChange}
                required
                className="border p-2 w-full"
              ></Input>
            </div>

            <div className="flex flex-col w-full ">
              <Label htmlFor="categoria">Categoria:</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Peito">Peito</SelectItem>
                  <SelectItem value="Perna">Perna</SelectItem>
                  <SelectItem value="Tríceps">Tríceps</SelectItem>
                  <SelectItem value="Ombro">Ombro</SelectItem>
                  <SelectItem value="Costas">Costas</SelectItem>
                  <SelectItem value="Abdômen">Abdômen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <Label htmlFor="observacao">Observações:</Label>
              <Input
                id="observacao"
                type="text"
                name="Observacoes"
                value={novoExercicio.Observacoes}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="url">Url vídeo:</Label>
              <Input
                id="url"
                placeholder="Url do vídeo"
                type="text"
                name="VideoExecucao"
                value={novoExercicio.VideoExecucao}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <Button
              className="bg-color[#7209b7] text-white p-2 rounded"
              variant="outline"
              size="sm"
              type="submit"
              disabled={loading}
            >
              {" "}
              <BiPlusCircle />
              {loading ? "Adicionando..." : "Adicionar Exercício"}
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
