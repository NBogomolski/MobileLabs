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
    TextInput,
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
    const [searchQuery, setSearchQuery] = React.useState('')
    const [resultNotFound, setResultNotFound] = React.useState(false)

    //get data from firestore
    
    const findNotes = () => {
        firebase
            .firestore()
            .collection("notes")
            .onSnapshot((querySnapshot) => {
                const newNotes = [];
                // console.log(querySnapshot);
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    const { note, title } = doc.data();
                    newNotes.push({ note, title, id: doc.id });
                });
                setNotes(newNotes);
                console.table(notes);
            });
    }
    
    React.useEffect(() => {
        // collection(firestore, 'notes').
        findNotes()
    }, []);


    //TODO: implement deletion
    function deleteNotes(id) {
        console.log(id)
        firebase
            .firestore()
            .collection("notes")
            .doc(id)
            .delete()
            .then(() => {
                navigation.navigate("Home");
            })
            .catch((err) => alert(err.message));
    }

    //function for swipeable to delete notes
    function renderRightView(route) {
        console.log(route.item.id)
        return <View style={{
            justifyContent: 'center',
        }}>
            <Button 
                title="Delete"
                color="red"
                onPress={() => {
                    deleteNotes(route.item.id)
                }
                }
                style={{
                    alignSelf: "center",
                }}
                >
            </Button>
        </View>
    }

    const renderSearch = async text => {
        setSearchQuery(text)
        if (!text.trim()) {
            setSearchQuery('')
            setResultNotFound(false)
            return await findNotes()
        }
        const filteredSearchNotes = notes.filter(note => {
            if (note.title.toLowerCase().includes(text.toLowerCase())) {
                return note
            }
        })
        if (filteredSearchNotes.length)
            setNotes([...filteredSearchNotes])
        else
            setResultNotFound(true)
    
    } 


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                value={searchQuery}
                placeholder="Search"
                placeholderTextColor="#A29C9B"
                onChangeText={(searchText) => renderSearch(searchText)}
            />
            {resultNotFound ? 
                <View style={{
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 10,

                }}>
                    <Text style={{
                        fontSize: 20,
                        fontStyle: "italic",
                        }}>Not found</Text>
                </View>
            : (
            <FlatList
                data={notes}
                numColumns={1}
                estimatedItemSize={100}
                style={styles.flashList}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => navigation.navigate("Detail", { item })}
                    >
                        <Swipeable
                            renderRightActions={() => renderRightView({ item })}
                        >
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
            )}
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
    searchBar: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#e7e9e7",
        height: 35,
        fontSize: 16,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 10,
        color: "#969696",
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
        paddingTop: 10,
        width: "90%",
        marginBottom: 20,
        maxHeight: "90%",
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
