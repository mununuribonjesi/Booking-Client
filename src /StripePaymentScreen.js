import React, { Component } from 'react';
import { FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import Moment from 'moment'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpoStripePurchase from 'expo-stripe-webview';
import axios from 'react-native-axios';
import config from '../config';
class StripePaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      placeholders: { number: "XXXX XXXX XXXX XXXX", expiry: "MM/YY", cvc: "CVC" },
      labels: { number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV" }
    }
  };



  onClose = () => {
    this.props.navigation.navigate('CheckoutScreen')
}

async onPaymentSuccess(token,total){


  const authToken = await AsyncStorage.getItem('token');
  const slot = this.props.orders.slot;
  const skill = Object.values(this.props.orders.service);
  const barber = this.props.barber;

  const response = await axios({
    method: 'post',
    url:'https://77d731428228.ngrok.io/api/payment',
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

  try {

    console.log(response);

    if (response.status === 200 && token) {
      this.props.navigation.navigate('AppointmentScreen');
      //const value = await AsyncStorage.getItem('token')
    }

  } catch (error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    throw error;
  }

}


  onChangeForm = (form) => {
    console.log(form)
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <ListItem style={styles}>
          <ListItem.Title style={styles.leftText}>Barber:</ListItem.Title>
          <ListItem.Content>
          </ListItem.Content>
          <Text style={styles.rightText}>{item.barber}
          </Text>
        </ListItem>
        <ListItem >
          <ListItem.Title style={styles.leftText}>Date:</ListItem.Title>
          <ListItem.Content >
          </ListItem.Content>
          <Text style={styles.rightText}>
            {Moment(new Date(item.slot.date)).format("ddd DD MMM YYYY")}
          </Text>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Title style={styles.leftText}>Slot:</ListItem.Title>
          <ListItem.Content>
          </ListItem.Content>
          <Text style={styles.rightText}>
            {item.slot.startTime} - {item.slot.endTime}
          </Text>
        </ListItem>
        {item.service.map((s) => (
          <ListItem style={styles}>
            <ListItem.Title style={styles.leftText}>x1  {s.Name}</ListItem.Title>
            <ListItem.Content>
            </ListItem.Content>
            <Text style={styles.rightText}>£{s.Price.toFixed(2)}
            </Text>
          </ListItem>
        ))
        }
        <ListItem topDivider>
          <ListItem.Title style={styles.leftText}>Total:</ListItem.Title>
          <ListItem.Content>
          </ListItem.Content>
          <Text style={styles.rightText}>
            £{item.total.toFixed(2)}
          </Text>
        </ListItem>
      </View>)
  }
  render() {

    const windowWidth = Dimensions.get('window').width;
    const total = this.props.orders.total * 100;
    const skill = Object.values(this.props.orders.service);





    return (
        <ExpoStripePurchase
        publicKey="pk_test_r8rYKYySFEUY1JbMdRKRpcl7"
        amount={total}
        imageUrl="www.clever-image-url.com"
        storeName="Clever Store Name"
        description={skill[0].Name}
        currency="GBP"
        allowRememberMe={true}
        prepopulatedEmail="clever_email@clever.com"
        onClose={this.onClose}
        onPaymentSuccess={async (token) => this.onPaymentSuccess(token,total)}
        style={{width: windowWidth * 3, alignSelf: 'center'}} />
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
      backgroundColor: 'white',
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

