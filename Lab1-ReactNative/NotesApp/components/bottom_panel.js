import React from "react";
import {
    Button,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const secondaryColor = "#F5F1ED";
// const textSize = ;
export const primaryColor = "#70798C";

export default function BottomPanel() {
    return (
        <View
        style={{
            
        }}
        >
            {/* <Text>Text</Text> */}
            <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: "25%",
                    right: 10,
                    backgroundColor: secondaryColor,
                    top: "25%",
                    width: "15%",
                    borderRadius: "20%",
                    borderBottomRightRadius: "25%",
                    justifyContent: "center",
                }}
            >
{                <Button
                    title="Add"
                    color="#828282"
                    style={{
                        // fontSize: textSize,
                        alignText: "center",
                    }}
                />}
            </TouchableOpacity>
            <Text
                style={{
                    position: "absolute",
                    left: 10,
                    // fontSize: textSize,
                    color: secondaryColor,
                }}
            >
                0 notes
            </Text>
        </View>
    );
}
