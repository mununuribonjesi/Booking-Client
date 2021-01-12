import React, { Component } from 'react';
import { FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity,Button, Dimensions,ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import Moment from 'moment'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpoStripePurchase from 'expo-stripe-webview';
import axios from 'react-native-axios';
import config from '../config';
import {
  BarIndicator,
  PacmanIndicator
} from 'react-native-indicators';

import { ScreenStackHeaderConfig } from 'react-native-screens';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

class StripePaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      placeholders: { number: "XXXX XXXX XXXX XXXX", expiry: "MM/YY", cvc: "CVC" },
      labels: { number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV" },
      isLoading:false,
      error:false,
      isBack:true
    }
  };



  onClose = () => {

    if(this.state.isBack)
    {
      this.props.navigation.navigate('CheckoutScreen')
    }
    else
    {

    }
}

async onPaymentSuccess(token,total){

  this.setState({isBack:false});
  this.setState({isLoading:true});

  const authToken = await AsyncStorage.getItem('token');
  const slot = this.props.orders.slot;
  const skill = Object.values(this.props.orders.service);
  const barber = this.props.orders.barber;

  const response = await axios({
    method: 'post',
    url:config.Stripe_URL+'/api/payment',
    data: {
      'token':token,
      'total':total,
      'name':barber,
      'startTime':slot.startTime,
      'endTime':slot.endTime,
      'date':slot.date,
      'skill':skill[0].Name
    },
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  this.setState({isLoading:false});

  try {

    if (response.status === 200 && token) {
      this.props.navigation.navigate('AppointmentScreen');
      //const value = await AsyncStorage.getItem('token')
    }
    else
    {

      this.setState({error:true});

    }

  } catch (error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    throw error;
  }

}

closeError()
{
    this.setState({error:false})
}


  onChangeForm = (form) => {
    console.log(form)
  }


  
  render() {

    const windowWidth = Dimensions.get('window').width;
    const total = this.props.orders.total * 100;
    const skill = Object.values(this.props.orders.service);

    return (

      <View style={styles.container[
        { backgroundColor: this.state.isLoading ? 'black' : 'white' }
      ]} > 

      {this.state.isLoading == true ?

        <View style={[styles.container, styles.horizontal]}>
        <PacmanIndicator size={80} color="#fff44f" />
      </View>

        :[
        <ExpoStripePurchase
        publicKey={config.STRIPE_KEY}
        amount={total}
        imageUrl="www.clever-image-url.com"
        description={skill[0].Name}
        currency="GBP"
        onClose={this.onClose}
        onPaymentSuccess={async (token) => this.onPaymentSuccess(token,total)}
        style={{width: windowWidth * 2.5, alignSelf: 'center'}} />
        ]
      }
      </View>
      
    )
  }
}

const mapStatetoProps = (state) => {


  return {
    orders: state.orderReducer
  }
}


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      height: '100%',
      flex: 1,
      textAlign: 'left'
  
    },
    loginFormTextInput: {
      backgroundColor: 'white'
  
    },
    loginFormView: {
      backgroundColor: 'black'
    },
    list: {
      justifyContent: 'center'
    },
    textStyle: {
      textAlign: 'center',
      color: 'black',
      fontSize: 40,
      padding: 7
    },
    subHeader: {
  
      backgroundColor: '#fff44f',
      height: '10%'
    },
  
    cardInputForm: {
      height: '80%'
    },
  
  
    Footer: {
      backgroundColor: 'black',
      height: '15%'
  
    },
  
    details: {
      backgroundColor: 'white',
      height: '75%',
      justifyContent: 'center',
  
    },
  
    cardModal: {
  
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      height: '10%'
  
  
    },
  
    formContainer:
    {
  
      height:'100%'
  
    },
  
    pbackground: {
      backgroundColor: 'red',
      alignItems: 'center',
      height: '20%'
    },
  
    cardLabel: {
  
      color: 'black'
    },
  
    FooterText:
    {
      color: 'white',
      marginTop: 25,
      fontSize: 40,
      textAlign: 'center',
  
    },
    leftText: {
      fontSize: 20,
      textAlign: 'left',
      marginTop: 20,
      marginBottom: 5,
      marginLeft: 50
  
    },
  
    paymentButton:
    {
      color: 'white',
      fontSize: 40,
      marginTop:10
  
    },
  
    FlatList: {
      marginTop: 40
  
    },
  
    rightText: {
      fontSize: 20,
      textAlign: 'left',
      marginTop: 20,
      marginBottom: 5,
      right: 50,
    },
  })

export default connect(mapStatetoProps)(StripePaymentScreen);

