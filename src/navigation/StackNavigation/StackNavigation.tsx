import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "../routes";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen/DetailsScreen";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName={routes.home}>
        <Stack.Screen
          name={routes.home}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.productDetail}
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;
