("use client");
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/types/ErrorResponse";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(5), //Alterar para 8 quando tiver essa validação no backend
});

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await api.post(`/auth/login`, {
        username: values.username,
        password: values.password,
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/home");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        toast.error(
          axiosError.response?.data?.message ||
            "Erro ao realizar o login, verifique suas credenciais"
        );
      }
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex items-center justify-center h-screen bg-black">
      <Card className="w-[350px]">
        <CardHeader className="items-center">
          <CardTitle className="text-3xl">Seja bem-vindo Leuri</CardTitle>
          <CardDescription className="text-lg">Faça o login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User</FormLabel>
                    <FormControl>
                      <Input placeholder="Usuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
