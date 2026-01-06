import { useState } from "react";
import { ValidationError } from "yup";
import { loginUserSchema } from "../validation/users";
import { login } from "../lib/login";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors([]);

    try {
      const validatedData = await loginUserSchema.validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      );
      const req = await login(validatedData);

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
          id="password"
          type="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="border p-2 rounded-sm w-full"
        type="submit"
        disabled={isLoading}
      >
        Login
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
