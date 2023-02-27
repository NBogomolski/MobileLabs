import React from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native";

export default function NewNote() {
    const [titleText, onChangeTitleText] = React.useState('')
    const [noteText, onChangeNoteText] = React.useState('') 

    return <SafeAreaView>
        <TextInput 
            style={styles.titleInput}
            placeholder='Title'
            // onChangeTitleText={onChangeTitleText}
            value={titleText}
            onChangeText={onChangeTitleText} 
        />
        <TextInput
            editable
            multiline
            style={styles.noteInput}
            placeholder='Note'
            onChangeText={onChangeNoteText}
            value={noteText}
        />
    </SafeAreaView>


}

const styles = StyleSheet.create({
    titleInput: {
        fontSize: 35,
        height: 60,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    noteInput: {
        fontSize: 20,
        marginTop: 10,
        margin: 10
    }
});