import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react'

import { useNavigation } from '@react-navigation/native';

export default function Home(){
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Scanner")}
            >
                <Text style={styles.text}>Scan QR-code</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Generator")}
            >
                <Text style={styles.text}>Generate QR-code</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#007AFF",
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").width * 0.15,
        margin: Dimensions.get("window").width * 0.05,
        borderRadius: 10,
    },
    text: {
        color: `#fff8dc`,
        fontSize: 20,
    },
});

