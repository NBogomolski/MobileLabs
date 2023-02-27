import React, { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Home from "./pages/home.js";
import Note from "./pages/note.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    component={Home}
                    name="Home"
                    options={{
                        headerTitle: () => <Text>hello world</Text>,
                    }}
                    
                />
                <Stack.Screen
                    component={Note}
                    name="Note"
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         margin: 20,
//     },
//    // all styles here
// });
