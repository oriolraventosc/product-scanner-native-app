import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../routes";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen/DetailsScreen";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName={Routes.home}>
        <Stack.Screen
          name={Routes.home}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.productDetail}
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;
