import { primaryColor } from "./bottom_panel";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function AppTitle() {
    <View
        style={{
            position: "absolute",
            top: 0,
            height: "20%",
            left: 0,
            width: "100%",
            color: primaryColor,
            justifyContent: "center"
        }}
    >
        <Text>Notes</Text>
    </View>;
}
