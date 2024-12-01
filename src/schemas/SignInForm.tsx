import { z } from "zod";

export const sendSignIn = z.object({
  username: z
    .string()
    .min(2, {
      message: "Usuário deve ter mais de 2 caracteres!.",
    })
    .max(50, {
      message: "Usuário não deve ter mais que 50 caracteres!.",
    }),
  password: z.string().min(5, {
    message: "A senha deve conter mais de 2 caracteres!.",
  }), //Alterar para 8 quando tiver essa validação no backend
});
