import { AxiosError } from "axios";

export const handleError = (error: AxiosError) :string => {
  if (error.response?.data) {
    const ErrorData = error.response.data;
    if (typeof ErrorData === "object") {
      if ("detail" in ErrorData) {
        return ErrorData.detail as string;
      }
      return "An error occurred";
    }
  }
  return "An error occurred";
};
