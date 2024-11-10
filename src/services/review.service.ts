import { https } from "@/lib/config/axios.config";
import { errorHandler } from "@/lib/utils/error";
import { Review } from "@/schema/interfaces/destination.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetDestinationReviews = (destinationId: string) => {
  const query = useQuery({
    queryKey: ["useGetDestinationReviews"],
    queryFn: async () => {
      try {
        const response = await https.get<Review[]>(
          `/review/destination/${destinationId}`
        );

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};

export const useDeleteReview = (reviewId: string) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteReview"],
    mutationFn: async () => {
      const response = await https.delete<Review>(`/review/${reviewId}`);

      return response?.data;
    },

    onError(error) {
      return errorHandler(error);
    },
  });

  return mutation;
};
