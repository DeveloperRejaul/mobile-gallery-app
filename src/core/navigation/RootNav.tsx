import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./Stack";

export default function RootNav() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
