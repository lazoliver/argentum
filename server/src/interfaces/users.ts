export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
}
