import React from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, Keyboard, TouchableOpacity, Button, Alert } from "react-native";
import {firebase} from '../config.js';
// import noteData from "../note_data.js";

export default function NewNote() {
    const [title, onChangeTitleText] = React.useState("");
    const [note, onChangeNoteText] = React.useState("");
    
    const handleAdd = () => {
        if (title != '' || note != '')                                    
            firebase
            .firestore()
            .collection("notes")
            .add({
                title,
                note,
            })
            .then(() => {
                onChangeTitleText("");
                onChangeNoteText("");
                Keyboard.dismiss();
            })
            .catch((err) => {
                alert(err.message);
            })
        // else if (title == '') Alert.alert('Failed','Please provide a title')
        // else if (note == '') alert('Please provide a note')
    }

    // <noteData.Provider value={{title: titleText, note: noteText}}/>
    return (
        <SafeAreaView style={styles.pageView}>
            <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={text => onChangeTitleText(text)}
                placeholder="Title"
                placeholderTextColor="#A29C9B"
            />
            <SafeAreaView style={styles.lineBreak}></SafeAreaView>
            <TextInput
                editable
                multiline
                value={note}
                onChangeText={text => onChangeNoteText(text)}
                style={styles.noteInput}
                placeholder="Note"
                // numberOfLines={4}
            />
            {/* <TouchableOpacity> */}
                <TouchableOpacity 
                    style={styles.buttonAdd}
                    onPress={handleAdd}
                >
                    <Text style={styles.buttonAddText}>Save</Text>
                </TouchableOpacity>
            {/* </TouchableOpacity> */}
        </SafeAreaView>
    );
}

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
    buttonAdd: {
        alignSelf: "center",
        marginTop: 10,
        width: "85%",
        backgroundColor: "#007AFF",
        // backgroundColor: "skyblue",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 15,
        marginTop: 10,
    },
    buttonAddText: {
        color: "white",
    },
});