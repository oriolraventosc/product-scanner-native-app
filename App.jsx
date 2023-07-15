import React, { useEffect } from "react";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation/StackNavigation";
import * as Permission from "expo-permissions";
import * as Notification from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";
import { Provider as PaperProvider } from "react-native-paper";

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

const App = () => {
  const handleNotification = () => {
    Notification.scheduleNotificationAsync({
      content: {
        title: "Cómo te encuentras?",
        body: "Encuentra products según tu estado de ánimo",
      },
      trigger: { seconds: 5 },
    });
  };

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
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
