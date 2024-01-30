import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { CustomerScreen} from "../screens/CustomerScreen";
import { OwnerScreen } from "../screens/OwnerScreen";

const { Navigator, Screen } = createStackNavigator();

const LoginNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Customer" component={CustomerScreen} />
        <Screen name="Owner" component={OwnerScreen} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <LoginNavigator />
    </NavigationContainer>
);