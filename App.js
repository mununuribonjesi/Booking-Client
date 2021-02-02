import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./src /LoginScreen";
import HomeScreen from "./src /HomeScreen";
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
const store = configureStore;


const screens = {
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: () => <Header />,
      headerShown: false //this will hide the header
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
BookScreen:{
  screen:BookScreen,
  navigationOptions: {
    headerTitle:() => <BsHeader />,
    headerShown:true,

  },
},
AppointmentScreen:{
  screen:AppointmentScreen,
  navigationOptions: {
    headerTitle:() => <BsHeader />,
    headerShown:true,

  },
},

LocationScreen:{
  screen:LocationScreen,
  navigationOptions: {
    headerTitle:"Choose Location",
    headerShown:true,
  },
},

GalleryScreen:{
  screen:GalleryScreen
},
OurTeamScreen:{
  screen:OurTeamScreen
},

CheckoutScreen:{
  screen:CheckoutScreen,
  navigationOptions: {
    headerTitle:() => <BsHeader />,
    headerShown:true,

  },
  
},


StripePaymentScreen:{
  screen:StripePaymentScreen,
  navigationOptions: {
    headerTitle:() => <BsHeader />,
    headerShown:true,

  },
  
},


SlotScreen:{
  screen:SlotScreen,
  navigationOptions: {
    headerTitle:() => <BsHeader />,
    headerShown:true,

  },
},
ServicesScreen:{
  screen:ServicesScreen,
  navigationOptions: {
    headerTitle:() => <BsHeader />,
    headerShown:true,

  },
},
AboutUsScreen:
{
  screen:AboutUsScreen
},

HomeScreen: {
  screen: HomeScreen,
  navigationOptions: {
    headerTitle: () => <Header />,
    headerShown:true,
    headerLeft: () => {
      return null;
    },
  },

}
};

const Navigation = createStackNavigator(screens,
  {
    initialRouteName:'LoginScreen',

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