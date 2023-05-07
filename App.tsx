import React from "react";
import { Text, View } from "react-native";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { Avatar, Provider as PaperProvider } from "react-native-paper";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <View>
          <Avatar.Icon size={64} icon="folder" />
          <Text>Open up App.tsx to start working on your app!</Text>
        </View>
      </PaperProvider>
    </Provider>
  );
};

export default App;
