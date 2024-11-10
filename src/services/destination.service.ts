import { https } from "@/lib/config/axios.config";
import { errorHandler } from "@/lib/utils/error";
import { CreateDestinationDto } from "@/schema/dto/destination.dto";
import { Destination } from "@/schema/interfaces/destination.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateDestination = () => {
  const payload = useMutation({
    mutationKey: ["useCreateDestination"],
    mutationFn: async (data: CreateDestinationDto) => {
      const response = await https.post<Destination>("/destination", {
        name: data.name,
        description: data.description,
        mainImage: data.mainImage,
        gallery: data.gallery,
        budget: data.budget,
        location: data.location,
      });

      return response?.data;
    },
    onError(error) {
      return errorHandler(error);
    },
  });

  return payload;
};

export const useGetDestinations = () => {
  const query = useQuery({
    queryKey: ["useGetDestinations"],
    queryFn: async () => {
      try {
        const response = await https.get<Destination[]>(`/destination`);

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};

export const useGetDestination = (destinationId: string) => {
  const query = useQuery({
    queryKey: ["useGetDestination"],
    queryFn: async () => {
      try {
        const response = await https.get<Destination>(
          `/destination/${destinationId}`
        );

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};

export const useDeleteDestination = (destinationId: string) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteDestination"],
    mutationFn: async () => {
      const response = await https.delete<Destination>(
        `/destination/${destinationId}`
      );

      return response?.data;
    },

    onError(error) {
      return errorHandler(error);
    },
  });

  return mutation;
};
