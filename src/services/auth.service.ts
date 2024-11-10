import { http } from "@/lib/config/axios.config";
import { errorHandler } from "@/lib/utils/error";
import { TokenStorage, UserStorage } from "@/lib/utils/localStorage";
import { LoginDTO, SignUpDTO } from "@/schema/dto/auth.dto";
import { RoleNames } from "@/schema/enums/admin.enum";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSignUp = (data: SignUpDTO) => {
  const payload = useMutation({
    mutationKey: ["useSignUp"],
    mutationFn: async () => {
      const response = await http.post("/auth/signup", {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        password: data?.password,
        role: RoleNames.ADMIN,
      });

      return response?.data;
    },

    onError(error) {
      return errorHandler(error);
    },
  });

  return payload;
};

export const useLogin = (data: LoginDTO) => {
  const payload = useMutation({
    mutationKey: ["useLogin"],
    mutationFn: async () => {
      const response = await http.post<{ accessToken: string }>("/auth/login", {
        email: data.email,
        password: data.password,
      });

      await TokenStorage.store(response?.data?.accessToken);

      return response?.data;
    },
    onError(error) {
      return errorHandler(error);
    },
  });

  return payload;
};

export const logout = () => {
  TokenStorage.remove();
  UserStorage.remove();
  toast.success("Logged Out Successfully");

  if (typeof window != "undefined") {
    window.location.href = "/login";
  }
};
