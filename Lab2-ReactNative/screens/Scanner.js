import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, Linking, Dimensions, TouchableOpacity, Alert, TextInput, } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
// import Clipboard from "@react-native-clipboard/clipboard";
// import { URL } from "url";

export default function Scanner(){
    const [permission, setPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [scannedText, setScannedText] = useState('');

    useEffect(() =>{
        (async () =>{
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setPermission(status === 'granted');
        })();
    }, []);


    function isWebUrl(str) {
        console.log(str)
        var pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
                "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                "(\\#[-a-z\\d_]*)?$",
            "i"
        ); // fragment locator
        return !!pattern.test(str);
        // return true
    }

    function setResult (text) {
        setScannedText(text)
        console.info(text)
      };
    
      const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setCopiedText(text);
      };

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);    
        console.log(data)
        if (isWebUrl(data)) {
            setResult(data)
            return Alert.alert(
                "Redirect",
                `The code is redirecting you to an external source (${data})`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    { text: "OK", onPress: () => Linking.openURL(data) },
                ]
            );
        } else
            setResult(data);
    };

    if(permission === null){
        return <Text>Requesting for Camera Permission</Text>
    }
    if(permission === false){
        return <Text>No Access to Camera</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.hint}>
                <Text>Place the QR code in the bracket</Text>
            </View>
            <BarCodeScanner
                style={styles.scanner}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}

                // style = {StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <View>
                    <TextInput
                        editable={false}
                        style={styles.result}
                        placeholder="Result"
                        value={scannedText}
                        onChangeText={(text) => setScannedText(text)}
                    ></TextInput>
                    <TouchableOpacity style={styles.rescan}>
                        <Button
                            color="#007AFF"
                            title="Rescan"
                            onPress={() => setScanned(false)}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    hint: {
        alignItems: "center",
        margin: 20,
    },
    scanner: {
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.9,
        height: Dimensions.get("window").width * 0.9,
    },
    result: {
        height: 40,
        fontSize: 25,
        width: Dimensions.get("window").width * 0.9,
        alignSelf: "center",
        marginTop: Dimensions.get("window").width * 0.05,
        borderWidth: 1,
        borderColor: "#007AFF",
        borderRadius: 10,
        paddingLeft: 10
    },
    rescan: {
        margin: 5,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.9,
    },
});
