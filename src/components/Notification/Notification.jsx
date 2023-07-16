import React, { useEffect } from "react";
import * as Permission from "expo-permissions";
import * as Notification from "expo-notifications";
import useStatusProducts from "../../utils/notification/notificationService";

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

const NotificationComponent = () => {
  const { statusProducts } = useStatusProducts();
  const handleNotification = () => {
    Notification.scheduleNotificationAsync({
      content: {
        title: "Cómo te encuentras?",
        body: "Encuentra products según tu estado de ánimo",
      },
      trigger: { seconds: 5 },
    });
  };

  Notification.addNotificationResponseReceivedListener(() => {
    // The notification has been clicked.
    statusProducts();
  });

  useEffect(() => {
    Permission.getAsync(Permission.NOTIFICATIONS)
      .then((response) => {
        if (response.status !== "granted") {
          return Permission.askAsync(Permission.NOTIFICATIONS);
        }
        return response;
      })
      .then((response) => {
        if (response.status !== "granted") {
          return;
        }
      }, []);
    handleNotification();
  }, []);
  return <></>;
};

export default NotificationComponent;
