import { https } from "@/lib/config/axios.config";
import { errorHandler } from "@/lib/utils/error";
import { EditConsultationDto } from "@/schema/dto/consultation.dto";
import { Consultation } from "@/schema/interfaces/consultation.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useEditConsultation = (consultationId: string) => {
  const payload = useMutation({
    mutationKey: ["useEditConsultation"],
    mutationFn: async (data: EditConsultationDto) => {
      const response = await https.put<Consultation>(
        `/consultation/${consultationId}`,
        {
          response: data.response,
        }
      );

      return response?.data;
    },
    onError(error) {
      return errorHandler(error);
    },
  });

  return payload;
};

export const useGetConsultation = (consultationId: string) => {
  const query = useQuery({
    queryKey: ["useGetConsultation"],
    queryFn: async () => {
      try {
        const response = await https.get<Consultation>(
          `/consultation/${consultationId}`
        );

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};
