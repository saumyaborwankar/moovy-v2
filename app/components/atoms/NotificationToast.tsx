import { notification } from "antd";
import { useCallback } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationOptions {
  type: NotificationType;
  message: string;
  description: string;
}

const useNotificationToast = () => {
  const [api, contextHolder] = notification.useNotification();

  const notify = useCallback(
    ({ type, message, description }: NotificationOptions) => {
      api[type]({
        message,
        description,
      });
    },
    [api]
  );

  return { notify, contextHolder };
};

export default useNotificationToast;
