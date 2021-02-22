import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./src /LoginScreen";
import HomeScreen from "./src /HomeScreen";
import ProfileScreen from "./src /ProfileScreen";
import Header from './shared/header';
import StripePaymentScreen from './src /StripePaymentScreen';
import React from 'react';
import AppointmentScreen from "./src /AppointmentScreen";
import createAccountScreen from "./src /createAccountScreen";
import BookScreen from "./src /BookScreen";
import GalleryScreen from "./src /GalleryScreen";
import OurTeamScreen from "./src /OurTeamScreen";
import ServicesScreen from "./src /ServicesScreen";
import AboutUsScreen from "./src /AboutUsScreen";
import BsHeader from "./shared/BsHeader";
import SlotScreen from "./src /SlotScreen";
import CheckoutScreen from "./src /checkoutScreen";
import LocationScreen from "./src /LocationScreen";
import {Provider} from "react-redux";
import configureStore from './src /store/store';
import verificationScreen from "./src /verificationScreen";
import {TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import BackButton from "./shared/BackButton";
import splashScreen from './src /splashScreen';
const store = configureStore;


const screens = {


  splashScreen: {
    screen: splashScreen,
    navigationOptions: {
      headerTitle: () => <Header />,
      headerShown: false, //this will hide the header
      animationEnabled: false,
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: () => <Header />,
      headerShown: false, //this will hide the header
      animationEnabled: false,
    },
},

createAccountScreen: {
  screen: createAccountScreen,
  navigationOptions: {
    headerTitle: () => <Header />,
    headerShown: false //this will hide the header
  },
},
verificationScreen: {
  screen: verificationScreen,
  navigationOptions: {
    headerTitle: () => <Header />,
    headerShown: false //this will hide the header
  },
},
ProfileScreen: {
  screen: ProfileScreen,
  navigationOptions: {
    headerTitle:"Profile",
    headerShown:true,
    animationEnabled: false,
  },
},
BookScreen:{
  screen:BookScreen,
  navigationOptions:({navigation}) => ({
    headerTitle:() => <BsHeader />,
    headerShown:true,
}),
},
AppointmentScreen:{
  screen:AppointmentScreen,
  navigationOptions:({navigation}) => ({
    headerTitle:() => <BsHeader />,
    headerShown:true,
    headerLeft:() =>
      <TouchableOpacity
      onPress={()=> navigation.navigate("HomeScreen")}>
      <BackButton />

      </TouchableOpacity>

    

  }),
},

LocationScreen:{
  screen:LocationScreen,
  navigationOptions:({navigation}) => ({
    headerTitle:"Choose Location",
    headerShown:true,
  }),
},

GalleryScreen:{
  screen:GalleryScreen
},
OurTeamScreen:{
  screen:OurTeamScreen
},

CheckoutScreen:{
  screen:CheckoutScreen,
  navigationOptions:({navigation}) => ({
    headerTitle:() => <BsHeader
    />,
    headerShown:true,

  }),
  
},


StripePaymentScreen:{
  screen:StripePaymentScreen,
  navigationOptions:({navigation}) => ({
    headerTitle:() => <BsHeader />,
    headerShown:true,

  }),
  
},


SlotScreen:{
  screen:SlotScreen,
  navigationOptions:({navigation}) => ({
    headerTitle:() => <BsHeader />,
    headerShown:true,

  }),
},
ServicesScreen:{
  screen:ServicesScreen,
  navigationOptions:({navigation}) => ({
    headerTitle:() => <BsHeader />,
    headerShown:true,

  }),
},
AboutUsScreen:
{
  screen:AboutUsScreen
},

HomeScreen: {
  screen: HomeScreen,
  navigationOptions:({navigation}) => ({
    headerTitle: () => 
    
    <TouchableOpacity
    onPress={()=> navigation.navigate("ProfileScreen")}>



    <Header
    navigation={navigation}
    />
    </TouchableOpacity>,

    headerShown:true,
    headerLeft: () => {
      return null;
    },
  }),

}
};

const Navigation = createStackNavigator(screens,
  {
    initialRouteName:'StripePaymentScreen',

      defaultNavigationOptions:{
      headerStyle: {backgroundColor:'black', height:100},
      headerTintColor:'white',
      headerBackTitle:null,
      
    }
  }
  );

const AppContainer = createAppContainer(Navigation);

const App = () =>
{
  return(
    <Provider store={store()}>
      <AppContainer/>
    </Provider>
  );
}
export default App;