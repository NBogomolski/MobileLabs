import React from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Button,
    FlatList,
    Pressable,
} from "react-native";
import BottomPanel from "../components/bottom_panel.js";
import AppTitle from "../components/app_title.js";
import {
    // NavigationContainer,
    useNavigation,
} from "@react-navigation/native";
import { firebase } from "../config.js";
import { FlashList } from "@shopify/flash-list";
import Swipeable from "react-native-gesture-handler/Swipeable";


export default function Home() {
    const navigation = useNavigation();
    const [notes, setNotes] = React.useState([]);

    //get data from firestore
    React.useEffect(() => {
        // collection(firestore, 'notes').
        firebase
            .firestore()
            .collection("notes")
            .onSnapshot((querySnapshot) => {
                const newNotes = [];
                // console.log(querySnapshot);
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    const {note, title} = doc.data();
                    newNotes.push({ note, title, id: doc.id });
                });
                setNotes(newNotes);
                console.table(notes);
            });
    }, []);


    //TODO: implement deletion
    function deleteNotes() {
        
    }

    //function for swipeable to delete notes
    function renderRightView() {
        
        return <View style={{
            justifyContent: 'center',
        }}>
            <Button 
                title="Delete"
                color="red"
                onPress={() => {
                    deleteNotes
                }}
                style={{
                    // height: "100%",
                    alignSelf: "center",
                }}
                >
            </Button>
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                numColumns={1}
                estimatedItemSize={100}
                style={styles.flashList}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => navigation.navigate('Detail', {item})}
                    >
                        <Swipeable renderRightActions={() => renderRightView()}>
                            <SafeAreaView style={styles.noteView}>
                                <Text style={styles.title}>{item.title}</Text>
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingBottom: 5,
                                    }}
                                >
                                    <Text numberOfLines={2} style={styles.note}>
                                        {item.note}
                                    </Text>
                                </View>
                            </SafeAreaView>
                        </Swipeable>
                    </Pressable>
                )}
            />
            <SafeAreaView style={styles.buttonWrapper}>
                <Button
                    style={styles.buttonAdd}
                    onPress={() => navigation.navigate("Note")}
                    title="Add note"
                ></Button>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    noteView: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        // fontStyle: "italic",
        alignSelf: "center",
    },
    note: {
        fontSize: 20,
        fontWeight: "normal",
        
    },
    flashList: {
        flex: 1,
        paddingTop: 22,
        width: "90%",
        marginBottom: 20,
        maxHeight: "90%"
    },
    buttonAdd: {
        backgroundColor: "black",
        borderRadius: 2,
        position: "relative",
        marginBottom: 30,
        width: "100%",
    },
    buttonWrapper: {
        width: "100%",
        
    },
});


// export default Home;
