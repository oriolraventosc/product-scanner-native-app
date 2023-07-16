import React, { useEffect } from "react";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation/StackNavigation";
import { Provider as PaperProvider } from "react-native-paper";
import Notification from "./src/components/Notification/Notification";

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <Notification />
          <StackNavigation />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
