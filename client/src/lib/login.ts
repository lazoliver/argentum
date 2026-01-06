import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export interface LoginUserRequest {
  email: string;
  password: string;
}

export async function login(req: LoginUserRequest) {
  try {
    const res = await axios.post(`${apiUrl}/users/login`, req);
    const data = res.data;

    return { token: data.token };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }

    throw new Error(`${error}`);
  }
}
