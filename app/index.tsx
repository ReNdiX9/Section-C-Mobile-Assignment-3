import { View } from "react-native";
import EmployeeInformation from "./EmployeeInformation";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EmployeeInformation />
    </View>
  );
}
