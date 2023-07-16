import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../../types/navigation/navigation.types";

const useStatusProducts = () => {
  const navigate = useNavigation<ScreenNavigationProp>();
  const statusProducts = () => {
    navigate.navigate("StatusProducts");
  };
  return { statusProducts };
};

export default useStatusProducts;
