import CircularSlider from "@/components/CircularSlider";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={{ flex: 1 }}>
        <StatusBar 
          translucent={true}
          backgroundColor="transparent"
          style="light"
        />
        <CircularSlider/>
      </View>
    </SafeAreaView>
  );
}
