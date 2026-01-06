import { object, string, ref } from "yup";

export const createUserSchema = object({
  email: string().email("Email inválido").required("Email é obrigatório"),

  firstName: string().required("Nome é obrigatório"),

  lastName: string().required("Sobrenome é obrigatório"),

  password: string()
    .required("Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),

  confirmPassword: string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([ref("password")], "As senhas não conferem"),
});

export const loginUserSchema = object({
  email: string().email("Email inválido").required("Email é obrigatório"),
  password: string()
    .required("Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});
