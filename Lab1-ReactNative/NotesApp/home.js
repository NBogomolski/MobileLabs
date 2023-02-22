import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import BottomPanel from '../components/bottom_panel.js'
import AppTitle from '../components/app_title.js'

const Home = function home() {
    //bgcolor F5F1ED
    return (
        <View style={{backgroundColor: '#f5f1ed'}}>
            {/* <AppTitle></AppTitle> */}
            <BottomPanel></BottomPanel>
        </View>
    );
}

export default Home;