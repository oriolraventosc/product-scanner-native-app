import { Platform } from "react-native";
import {
  NotificationRequestInput,
  scheduleNotificationAsync,
} from "expo-notifications";

const NotificationService = {
  scheduleDailyNotification: async () => {
    const notificationContent = {
      identifier: "daily-notification",
      title: "Daily Notification",
      body: "This is a daily notification!",
      ios: {
        sound: true,
      },
      android: {
        channelId: "daily-channel",
        icon: "ic_launcher",
      },
      trigger: {
        hour: 0,
        minute: 41,
        repeats: true,
      },
    };

    await scheduleNotificationAsync({
      content: notificationContent,
      trigger: notificationContent.trigger,
    });
  },
};

export default NotificationService;
