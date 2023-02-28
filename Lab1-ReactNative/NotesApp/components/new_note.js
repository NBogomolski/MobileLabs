import React from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native";

export default function NewNote() {
    const [titleText, onChangeTitleText] = React.useState("");
    const [noteText, onChangeNoteText] = React.useState("");

    return (
        <SafeAreaView style={styles.pageView}>
            <TextInput
                style={styles.titleInput}
                placeholder="Title"
                placeholderTextColor="#A29C9B"
                value={titleText}
                onChangeText={onChangeTitleText}
            />
            <SafeAreaView style="linebreak"></SafeAreaView>
            <TextInput
                editable
                multiline
                style={styles.noteInput}
                placeholder="Note"
                onChangeText={onChangeNoteText}
                value={noteText}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageView: {
        borderRadius: 15,
        margin: 5,
    },
    titleInput: {
        alignSelf: "center",
        fontSize: 35,
        height: 45,
        margin: 10,
        // borderWidth: 1,
        // padding: 10,
    },
    linebreak:{
        borderTopWidth: 1,
        borderTopColor: "black",
        borderStyle: "solid",
        backgroundColor: "black",
        height: 1,
        
    },
    noteInput: {
        fontSize: 25,
        margin: 10,
        paddingTop: 0
    },
});
