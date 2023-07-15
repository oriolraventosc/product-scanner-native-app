declare module "notifee" {
  export const createChannel: (
    channelConfig: Notifee.ChannelConfig
  ) => Promise<string>;
  export const scheduleNotification: (
    notificationConfig: Notifee.NotificationConfig
  ) => Promise<void>;
  // Add more function declarations and type interfaces as needed
}

declare namespace Notifee {
  export interface ChannelConfig {
    id: string;
    name: string;
    // Add more properties as needed
  }

  export interface NotificationConfig {
    id: string;
    title: string;
    body: string;
    data?: Record<string, any>;
    android?: any;
    ios?: any;
    // Add more properties as needed
  }

  // Add more interfaces and types as needed
}
