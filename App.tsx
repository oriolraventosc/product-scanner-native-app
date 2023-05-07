import React from "react";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigation/StackNavigation";

import { Provider as PaperProvider } from "react-native-paper";

const App = (): JSX.Element => {
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
