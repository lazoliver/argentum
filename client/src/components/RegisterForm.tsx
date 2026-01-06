import { useState } from "react";
import { register } from "../lib/register";
import { ValidationError } from "yup";
import { createUserSchema } from "../validation/users";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors([]);

    try {
      const validatedData = await createUserSchema.validate(
        {
          email,
          firstName,
          lastName,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );
      const req = await register(validatedData);

      localStorage.setItem("auth", req.token);
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(error.errors);
        return;
      }

      if (error instanceof Error) {
        setErrors([error.message]);
        return;
      }

      setErrors(["Erro inesperado"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-[300px] border rounded-sm p-4"
    >
      <div className="flex flex-col">
        <input
          className="border p-1 px-2"
          id="email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <input
          className="border p-1 px-2"
          id="firstName"
          type="text"
          value={firstName}
          placeholder="Nome"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <input
          className="border p-1 px-2"
          id="lastName"
          type="text"
          value={lastName}
          placeholder="Sobrenome"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <input
          className="border p-1 px-2"
          id="password"
          type="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <input
          className="border p-1 px-2"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          placeholder="Confirmar senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className="border p-2 rounded-sm w-full"
        type="submit"
        disabled={isLoading}
      >
        Registrar
      </button>
      {errors.length > 0 && (
        <ul>
          {errors.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
