import axios from "axios";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData: unknown = error.response?.data;
    let responseMessage: string | undefined;

    if (typeof responseData === "string") {
      responseMessage = responseData;
    } else if (responseData && typeof responseData === "object") {
      const data = responseData as Record<string, unknown>;
      const message =
        data.message ?? data.errorMessage ?? data.detail ?? data.error;
      if (typeof message === "string") {
        responseMessage = message;
      } else if (message && typeof message === "object") {
        responseMessage = JSON.stringify(message);
      }
    }

    if (status === 403) {
      return responseMessage
        ? `Access denied (403): ${responseMessage}`
        : "Access denied (403). You do not have permission to access videos.";
    }

    if (status === 404) {
      return responseMessage
        ? `Video service or video not found (404): ${responseMessage}`
        : "Video service or video not found (404).";
    }

    if (status) {
      return responseMessage
        ? `Video request failed (${status}): ${responseMessage}`
        : `Video request failed with status ${status}.`;
    }

    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      return "Could not reach the video service. Check the API URL and your connection.";
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const successNotification = (message: string) =>{
     notifications.show({
        title: "Success",
        message: message,
        color: "green", 
        icon:<IconCheck />,
        withCloseButton: true,
        withBorder: true,
        className: "border-green-500"

     });
};

const errorNotification = (message: string) =>{
     notifications.show({
        title: "Error",
        message: message,
        color: "red", 
        icon:<IconX />,
        withCloseButton: true,
        withBorder: true,
        className: "border-red-500"
     });
};

export { successNotification, errorNotification, getErrorMessage };