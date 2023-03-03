import React, { useState, useContext } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    Button,
    View,
    Keyboard,

} from "react-native";
import Home from "./pages/home.js";
import Note from "./pages/note.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import noteData from "./note_data.js";
import {firebase} from "./config.js"
import Detail from "./components/detail.js";

const Stack = createStackNavigator();

export default function App() {



    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    component={Home}
                    name="Home"
                    options={{
                        headerTitle: () => <Text>YourAppName</Text>,
                    }}
                />
                <Stack.Screen
                    component={Note}
                    name="Note"
                    options={{
                        headerRight: () => (
                            <Button 
                                title="Done"
                                onPress={Keyboard.dismiss}
                            >
                            </Button>
                        ),
                    }}
                />
                <Stack.Screen
                    component={Detail}
                    name="Detail"
                    options={{
                        headerTitle: () => <Text>Edit</Text>,
                        headerRight: () => (
                        <Button
                                title="Done"
                                onPress={Keyboard.dismiss}
                            ></Button>
                        ),
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}