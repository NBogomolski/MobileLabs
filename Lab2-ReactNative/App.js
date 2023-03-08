import React from 'react';

import Scanner from './screens/Scanner';
import Home from './screens/Home';
import Generator from './screens/Generator';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Keyboard, Button, Text } from 'react-native';

const Stack = createStackNavigator();

function App() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ 
		title: 'QR Scanner'
	  }} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Generator" component={Generator} 
          options={{
             headerRight: () => {
				return (
					<Button 
						title="Done"
						onPress={Keyboard.dismiss}
					/>
				)
			 }   
          }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}