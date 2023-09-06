import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../routes";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen/DetailsScreen";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen/RegisterScreen";
import FavouriteProductsScreen from "../../screens/FavouriteProductsScreen/FavouriteProductsScreen";
import ScannerScreen from "../../screens/ScannerScreen/ScannerScreen";
import StatusScreen from "../../screens/statusScreen/statusScreen";
import StatusProductsScreen from "../../screens/StatusProductsScreen/StatusProductsScreen";
import UserDetailsScreen from "../../screens/UserDetailsScreen/UserDetailsScreen";

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
        <Stack.Screen
          name={Routes.login}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.register}
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.myProducts}
          component={FavouriteProductsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.scanner}
          component={ScannerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.status}
          component={StatusScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.statusProducts}
          component={StatusProductsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.user}
          options={{ headerShown: false }}
          component={UserDetailsScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;
