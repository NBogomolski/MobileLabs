import React from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Button
} from "react-native";
import BottomPanel from "../components/bottom_panel.js";
import AppTitle from "../components/app_title.js";
import {
    // NavigationContainer,
    useNavigation,
} from "@react-navigation/native";

export default function Home() {
const navigation = useNavigation();

    return (
        <View
            style={{
                backgroundColor: "#f5f1ed",
            }}
        >
            {/* <AppTitle></AppTitle>  */}
            {/* <BottomPanel></BottomPanel> */}
            <Button onPress={() => navigation.navigate("Note")} title="Add note">
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({});

// export default Home;
