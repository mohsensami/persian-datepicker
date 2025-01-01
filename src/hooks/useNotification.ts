import { useEffect, useState } from "react";

const useNotification = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
      if (Notification.permission === "default") {
        setShowPopup(true);
      }
    }
  }, []);

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === "granted") {
        setShowPopup(false);
      }
    }
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permission === "granted") {
      const notification = new Notification(title, options);
      notification.onclick = () => {
        console.log("Notification clicked");
      };
    } else if (permission === "denied") {
      console.warn("Notification permission has been denied.");
    } else {
      console.warn("Notification permission not granted yet.");
    }
  };

  return {
    permission,
    requestPermission,
    showNotification,
    showPopup,
    setShowPopup,
  };
};

export default useNotification;
