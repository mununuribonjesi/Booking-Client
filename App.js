import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./src /LoginScreen";
import HomeScreen from "./src /HomeScreen";
import ProfileScreen from "./src /ProfileScreen";
import Header from './shared/header';
import React from 'react';
import AppointmentScreen from "./src /AppointmentScreen";
import CreateAccountScreen from "./src /CreateAccountScreen";
import BookScreen from "./src /BookScreen";
import GalleryScreen from "./src /GalleryScreen";
import OurTeamScreen from "./src /OurTeamScreen";
import ServicesScreen from "./src /ServicesScreen";
import AboutUsScreen from "./src /AboutUsScreen";
import BsHeader from "./shared/BsHeader";
import SlotScreen from "./src /SlotScreen";
import CheckoutScreen from "./src /CheckoutScreen";
import LocationScreen from "./src /LocationScreen";
import {Provider} from "react-redux";
import configureStore from './src /store/store';
import VerificationScreen from "./src /VerificationScreen";
import {TouchableOpacity} from 'react-native';
import BackButton from "./shared/BackButton";
import SplashScreen from './src /SplashScreen';
import UpdateScreen from "./src /UpdateScreen";
import CancelButton from "./shared/CancelButton";
import { LogBox } from "react-native";
const store = configureStore;
LogBox.disableYellowBox = true;

const screens = {


  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      headerTitle: () => <Header />,
      headerShown: false, //this will hide the header
      animationEnabled: false,
    },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions:({navigation}) => ({
      headerTitle:() => <BsHeader />,
      animationEnabled:false,
      headerShown:true,
      headerLeft:() =>
        <TouchableOpacity
        onPress={()=> navigation.navigate("HomeScreen")}>
  
        <BackButton />
  
  
        </TouchableOpacity>
  
      
  
    }),
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: () => <Header />,
      headerShown: false, //this will hide the header
      animationEnabled: false,
    },
},

CreateAccountScreen: {
  screen: CreateAccountScreen,
  navigationOptions: {
    headerTitle: () => <Header />,
    headerShown: false //this will hide the header
  },
},
VerificationScreen: {
  screen: VerificationScreen,
  navigationOptions: {
    headerTitle: () => <Header />,
    headerShown: false //this will hide the header
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


UpdateScreen:{
  screen:UpdateScreen,
  navigationOptions:({navigation}) => ({
    headerTitle:() => <BsHeader />,
    headerShown:true,
    headerLeft:() =>
    <TouchableOpacity
    onPress={()=> navigation.navigate("ProfileScreen")}>

    <CancelButton />


    </TouchableOpacity>

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
    initialRouteName:'GalleryScreen',

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