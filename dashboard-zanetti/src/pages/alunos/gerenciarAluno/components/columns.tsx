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
import { BiEdit, BiTrash } from "react-icons/bi";

export type Aluno = {
  AlunoID: number;
  Nome: string;
  PesoAtual: string;
  Idade: string;
  Altura: string;
  MusculoAlvo: string;
  Objetivo: string;
  FrequenciaSemanal: string;
  Lesoes: string;
  TempoTreinando: string;
};

export const columns: ColumnDef<Aluno>[] = [
  {
    accessorKey: "Nome",
    header: "Nome",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const aluno = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações para {aluno.Nome}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BiTrash />
              Excluir
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BiEdit />
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
