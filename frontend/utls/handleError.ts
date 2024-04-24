import { AxiosError } from "axios";

export const handleError = (error: AxiosError): string => {
  if (error.response?.data) {
    const ErrorData = error.response.data;
    if (typeof ErrorData === "object") {
      if ("detail" in ErrorData) {
        if (typeof ErrorData.detail === "string") {
          return ErrorData.detail;
        } else if (typeof ErrorData.detail === "object") {
          const detail = ErrorData.detail;
          if (Array.isArray(detail)) {
            let msg = "";
            for (const item of detail) {
              msg += item.msg + "\n";
            }
            return msg;
          } else {
            return "An error occurred";
          }
        } else {
          return "An error occurred";
        }
      }
      return "An error occurred";
    }
  }
  return "An error occurred";
};
