
import { WebView } from 'react-native-webview'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View, FlatList, Image, Pressable, Modal, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as rssParser from 'react-native-rss-parser'
import { Entypo } from '@expo/vector-icons'
import { NotFound } from './NotFound.js'

// const Stack = createStackNavigator()

/* function HomeFeed () {
  
  return (
    )
}

function ArticleView () {
  return (
  )
} */

export default function App () {
  const [items, setItems] = useState([]);
  const [link, setLink] = useState("");
  const [activeLink, setActiveLink] = useState(false);
  const [resultNotFound, setResultNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const feedURL = "http://rss.cnn.com/rss/cnn_topstories.rss";

  const findItems = () => {
      fetch(feedURL)
          .then((response) => response.text())
          .then((responseData) => rssParser.parse(responseData))
          .then((rss) => {
              console.log(rss.items[0]);
              setItems(rss.items);
              // console.log(rss.items[1]);
          });
  };

  const handleOnSearchInput = async (text) => {
      setSearchQuery(text);
      if (!text.trim()) {
          setSearchQuery("");
          setResultNotFound(false);
          return await findItems();
      }
      const filteredSearchItem = items.filter((item) => {
          if (item.title.toLowerCase().includes(text.toLowerCase())) {
              return item;
          }
      });
      if (filteredSearchItem.length) {
          setItems([...filteredSearchItem]);
      } else {
          setResultNotFound(true);
      }
      // if (searchQuery == '') {
      //   setResultNotFound(false);
      //   return await findItems()
      // }
  };

  useEffect(() => {
      findItems();
  }, []);

  const handleClose = () => {
      setActiveLink(false);
  };

  const handleOpen = () => {
      setActiveLink(true);
  };




  return (
      <>
        <SafeAreaView style={{
          height: "15%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}><Text style={{fontSize: 30, fontWeight: "bold"}}>CNN News</Text></SafeAreaView>
        <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              value={searchQuery}
              placeholder='Search'
              onChangeText={searchText => handleOnSearchInput(searchText)}
              inlineImageLeft={() => {
                /* return (
                    <Entypo
                        name="magnifying-glass"
                        style={styles.searchIcon}
                        size={22}
                        color="#969696"
                    ></Entypo>
                ); */
              }}
            />
            
            {searchQuery ? (<Entypo name='cross' onPress={() => setSearchQuery('')} style={styles.clearIcon} size={25} color='#969696'></Entypo>) : null}
            { resultNotFound
              ? (<NotFound/>)
              : (<FlatList
              data={items}
              numColumns={1}
              style={styles.flatList}
              renderItem={({ item }) => (
                  <Pressable
                    onPress={() => { setLink(item.id); handleOpen(); console.log(link) }}>
                    <View style={styles.flatItem}>
                      <View style={styles.textView}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.published}>{item.published}</Text>
                      </View>
                    </View>
                  </Pressable>
              )}
            >
            </FlatList>)}
          </View>
        <Modal
          animationType={'slide'}
          visible={activeLink}
          onRequestClose={() => handleClose()}>
          <TouchableOpacity style={{ height: '10%', backgroundColor: 'black', paddingTop: 40, paddingLeft: 10}}>
            <Entypo name='back' onPress={() => handleClose()}  style={styles.closeIcon} size={40} color='white'></Entypo>
          </TouchableOpacity>
          <WebView
            onShouldStartLoadWithRequest={() => true}
            source={{
              uri: link
            }}
            originWhitelist={['*']}
            style={{ flex: 1}}
          />
        </Modal>
      <View/>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatList: {
    flex: 1,
    width: '96%',
    paddingTop: 30
  },
  flatItem: {
    flex: 1,
    flexDirection: 'row',
    height: 150,
    width: '100%',
    paddingLeft: 5
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    paddingTop: 30,
    paddingBottom: 20,
    height: '100%',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  published: {
    fontSize: 15,
    marginTop: 5
  },
  image: {
    width: '30%',
    height: '70%',
    borderRadius: 15,
    alignSelf: 'center'
  },
  textInput: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#e7e9e7',
    height: 35,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 35,
    marginTop: 10,
    color: '#969696'
  },
  searchIcon: {
    position: 'absolute',
    top: 75,
    left: 25,
    zIndex: 3
  },
  clearIcon: {
    position: 'absolute',
    top: 75,
    left: '87%',
    zIndex: 3
  },
})
