import toast from "react-hot-toast";

export function errorHandler<T = any>(error: T | any) {
  error =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    error;
  toast.error(error, {
    duration: 3000,
  });
  return error as T;
}
