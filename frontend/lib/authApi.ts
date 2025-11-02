import { fetchWithCredentials, ApiError } from "./api-utils";
import type { SignupData, LoginData, User, ApiResponse } from "./types";

export const authApi = {
  async signup(data: SignupData): Promise<ApiResponse<{ user: User }>> {
    const response = await fetchWithCredentials("/user/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async login(data: LoginData): Promise<ApiResponse<{ user: User }>> {
    const response = await fetchWithCredentials("/user/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async logout(): Promise<ApiResponse<void>> {
    const response = await fetchWithCredentials("/user/logout", {
      method: "GET",
    });
    return response.json();
  },

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    const response = await fetchWithCredentials("/user/me", {
      method: "GET",
    });
    return response.json();
  },
};

export { ApiError };
