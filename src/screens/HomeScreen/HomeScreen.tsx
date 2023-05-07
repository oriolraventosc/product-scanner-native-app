import React from "react";
import { Avatar } from "react-native-paper";
import { Text } from "react-native";

const HomeScreen = (): JSX.Element => {
  return (
    <>
      <Avatar.Icon size={64} icon="folder" />
      <Text>Open up App.tsx to start working on your app!</Text>
    </>
  );
};

export default HomeScreen;
