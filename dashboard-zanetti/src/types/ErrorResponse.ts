// src/types/ErrorResponse.ts

export interface ErrorResponse {
  message?: string;
  statusCode?: number; // A propriedade message é opcional
  // Adicione outras propriedades que você espera receber na resposta de erro
}
