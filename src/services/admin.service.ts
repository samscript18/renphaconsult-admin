import { https } from "@/lib/config/axios.config";
import { errorHandler } from "@/lib/utils/error";
import { UserStorage } from "@/lib/utils/localStorage";
import { EditProfileDTO } from "@/schema/dto/admin.dto";
import { Admin } from "@/schema/interfaces/admin.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useEditProfile = (adminId: string) => {
  const mutation = useMutation<Admin, Error, EditProfileDTO>({
    mutationKey: ["useEditProfile"],
    mutationFn: async (data: EditProfileDTO) => {
      const response = await https.put<Admin>(`/user/${adminId}`, data);

      await UserStorage.store(response?.data);

      return response?.data;
    },

    onError(error) {
      return errorHandler(error);
    },
  });

  return mutation;
};

export const useGetProfile = () => {
  const query = useQuery({
    queryKey: ["useGetProfile"],
    queryFn: async () => {
      try {
        const response = await https.get<Admin>(`/user/profile`);

        await UserStorage.store(response?.data);

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};
