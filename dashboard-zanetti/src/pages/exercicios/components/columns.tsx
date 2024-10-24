"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiEdit, BiGlasses, BiTrash } from "react-icons/bi";

export type Exercicio = {
  ExercicioID: number;
  NomeExercicio: string;
  Observacoes: string;
  Categoria: string;
  VideoExecucao: string;
};

export const columns: ColumnDef<Exercicio>[] = [
  {
    accessorKey: "NomeExercicio",
    header: "Nome",
  },
  {
    accessorKey: "Categoria",
    header: "Grupo Muscular",
  },
  {
    accessorKey: "Observacoes",
    header: "Observação",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const exercicio = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BiTrash />
              Excluir
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BiEdit />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open(exercicio.VideoExecucao)}
            >
              <BiGlasses />
              Visualizar Vídeo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
