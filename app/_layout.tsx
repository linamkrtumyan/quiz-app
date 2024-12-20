import { Stack } from "expo-router";
import { Provider } from "react-redux";

import store from "@/src/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{}} />
        <Stack.Screen name="quiz" options={{}} />
        <Stack.Screen name="result" options={{}} />
      </Stack>
    </Provider>
  );
}
