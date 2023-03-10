import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Generator() {
    const [inputValue, setInputValue] = useState("");
    const [qrValue, setQrValue] = useState("");

    const styles = getStyles(qrValue);

    return (
        <View style={styles.container}>
            <QRCode
                style={styles.qrcode}
                value={
                    qrValue
                        ? qrValue
                        : "https://www.youtube.com/watch?v=dq-qsOR4-M8&list=TLPQMDcwMzIwMjPvjfypRVIjJw&index=5"
                }
                size={qrValue ? Dimensions.get("window").width * 0.8 : 0}
                color="black"
                backgroundColor="white"
            ></QRCode>
            <TextInput
                style={styles.input}
                placeholder="Message"
                onChangeText={(text) => {
                    setInputValue(text);
                }}
            ></TextInput>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setQrValue(inputValue);
                }}
            >
                <Text style={styles.text}>Generate</Text>
            </TouchableOpacity>
        </View>
    );
}

const getStyles = (qrIsSet) =>
    StyleSheet.create({
        container: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: qrIsSet ? Dimensions.get("window").width * 0.05 : 0,
        },
        qrcode: {
            visibility: "hidden",
        },
        input: {
            height: 40,
            margin: Dimensions.get("window").width * 0.05,
            width: Dimensions.get("window").width * 0.8,
            borderWidth: 1,
            padding: 10,
            borderColor: "#007AFF",
            borderRadius: 10,
            fontSize: 25,
            padding: 5,
            textAlign: "center",
        },
        button: {
            alignItems: "center",
            padding: 10,
            backgroundColor: "#007AFF",
            width: Dimensions.get("window").width * 0.8,
            borderRadius: 10,
        },
        text: {
            color: `#fff8dc`,
        },
    });
