import {
    TouchableOpacity,
    TextInput,
    View,
    SafeAreaView,
    Text,
    StyleSheet,
} from "react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../config.js'

const Detail = ({route}) => {
    const navigation = useNavigation()
    const [noteText, setNoteText] = React.useState(route.params.item.note)
    const [titleText, setTitleText] = React.useState(route.params.item.title);

    const updateNote = () => {
        if (titleText.length > 0) {
            firebase.firestore()
            .collection('notes')
            .doc(route.params.item.id)
            .update({
                title: titleText,
                note: noteText,
            })
            .then(() => {
                navigation.navigate('Home')
            })
            .catch((err) => {
                alert(err.message)
            })
        }
    }

    const deleteNote = () => {
        firebase.firestore()
        .collection('notes')
        .doc(route.params.item.id)
        .delete()
        .then(() => {
            navigation.navigate('Home')
        })
        .catch(err => alert(err.message))
    }

    return (
        <SafeAreaView style={styles.pageView}>
            <TextInput
                style={styles.titleInput}
                value={titleText}
                onChangeText={(text) => setTitleText(text)}
                placeholder="Title"
                placeholderTextColor="#A29C9B"
            />
            <SafeAreaView style={styles.lineBreak}></SafeAreaView>
            <TextInput
                editable
                multiline
                value={noteText}
                onChangeText={(text) => setNoteText(text)}
                style={styles.noteInput}
                placeholder="Note"
                // numberOfLines={4}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonUpdate} onPress={updateNote}>
                    <Text style={styles.buttonUpdateText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDelete} onPress={deleteNote}>
                    <Text style={styles.buttonDeleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Detail

const styles = StyleSheet.create({
    pageView: {
        borderRadius: 15,
        margin: 5,
    },
    titleInput: {
        // alignSelf: "center",
        fontSize: 35,
        height: 45,
        margin: 10,
    },
    lineBreak: {
        borderTopWidth: 1,
        borderTopColor: "black",
        borderStyle: "solid",
        backgroundColor: "black",
        height: 1,
        width: "85%",
        alignSelf: "center",
    },
    noteInput: {
        fontSize: 25,
        margin: 10,
        paddingTop: 0,
        maxHeight: "55%",
    },
    buttonUpdate: {
        alignSelf: "center",
        flex: 1,
        backgroundColor: "#007AFF",
        // backgroundColor: "skyblue",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 15,
        maxWidth: "45%",
    },
    buttonUpdateText: {
        color: "white",
    },
    buttonDelete: {
        backgroundColor: "red",
        flex: 1,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        maxWidth: "45%",
    },
    buttonDeleteText: {
        color: "white",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "85%",
        margin: 10,
        alignSelf: "center",
        justifyContent: "space-around",
    },
});
