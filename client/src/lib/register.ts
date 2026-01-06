import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export interface RegisterUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export async function register(req: RegisterUserRequest) {
  try {
    const res = await axios.post(`${apiUrl}/users/register`, req);
    const data = res.data;

    return { token: data.token };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }

    throw new Error(`${error}`);
  }
}
