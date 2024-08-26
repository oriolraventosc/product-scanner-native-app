import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import useStatusProducts from "../../utils/notification/notificationService";

// Set up the notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false, // You can customize this based on your needs
    };
  },
});

const NotificationComponent = () => {
  const { statusProducts } = useStatusProducts();

  // Function to handle scheduling notifications
  const handleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cómo te encuentras?",
        body: "Encuentra productos según tu estado de ánimo",
        // Ensure this path is correct and the icon exists
        icon: require("../../../assets/icon.png"),
      },
      trigger: { seconds: 5 },
    });
  };

  useEffect(() => {
    // Request notification permissions
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          console.warn("Notification permissions not granted");
          return;
        }
      }
      // Schedule notification
      handleNotification();
    };

    requestPermissions();
  }, []);

  // Add listener for notification responses
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // The notification has been clicked
        statusProducts();
      }
    );

    // Clean up the subscription on unmount
    return () => subscription.remove();
  }, [statusProducts]);

  return null; // This component doesn't render anything
};

export default NotificationComponent;
