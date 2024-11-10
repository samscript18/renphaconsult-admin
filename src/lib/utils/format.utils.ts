export const formatValue = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedValue;
};

export const deFormatValue = (value: string): string => {
  const deFormattedValue = value.replace(/,/g, "");
  return deFormattedValue;
};
