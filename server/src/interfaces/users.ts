export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface CreateUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
