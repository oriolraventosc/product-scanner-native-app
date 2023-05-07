import React from "react";
import GlobalStyles from "./src/styles/globalStyles";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider } from "@mui/material";
import mainTheme from "./src/styles/mainTheme";
import colors from "./src/styles/colors";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <View>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
};

export default App;
