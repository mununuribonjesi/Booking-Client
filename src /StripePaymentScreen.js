import React, { Component } from 'react';
import { FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity,TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpoStripePurchase from 'expo-stripe-webview';
import {Ionicons } from '@expo/vector-icons';
import axios from 'react-native-axios';
import config from '../config';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import { ScreenStackHeaderConfig } from 'react-native-screens';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

class StripePaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      placeholders: { number: "XXXX XXXX XXXX XXXX", expiry: "MM/YY", cvc: "CVC" },
      labels: { number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV" },
      isLoading:false,
      error:false,
      isBack:true,
      isSuccessfull:false,
      isPayment:false,
      isError:false,
      isView:false,
      isRetry:false,
      errorMessage:''
    }

    this.isError= this.isError.bind(this);
    this.closeSuccessfull = this.closeSuccessfull.bind(this);
  };


  async componentDidMount()
  {
    this.setState({isSuccessfull:false,error:false});

    Stripe.setOptionsAsync({
      publishableKey:config.STRIPE_KEY, // Your key
      androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
      merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
    });

  }

async stripePayment()
{

    const params = {
      number: '4242424242424242',
      expMonth: 11,
      expYear: 17,
      cvc: '223',
   }

   const token = await Stripe.createTokenWithCardAsync(params);
}


async onPaymentSuccess(token,total){

  this.setState({isBack:false});
  this.setState({isLoading:true});

  const authToken = await AsyncStorage.getItem('token');
  const slot = this.props.orders.slot;
  const skill = Object.values(this.props.orders.service);
  const barber = this.props.orders.barber;

  var res;

    await axios({
    method: 'post',
    url:config.Stripe_URL+'/api/payment',
    data: {
      'token':token,
      'total':total,
      'name':barber,
      'startTime':slot.startTime,
      'endTime':slot.endTime,
      'date':slot.date,
      'skill':skill[0].skillId
    },
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  }).then(response => 
    {

      res = response

    }).catch(error => {
      if(error.response)
      {
        res = error.response;
        this.setState({errorMessage:JSON.stringify(error.response.status),isError:true});
      }
    })


    if (res.status === 200 && token) {
     
      this.setState({isSuccessfull:true,isPayment:true});
    }  

    this.setState({isLoading:false});

}


isError = (isRetry) =>
{
  this.setState({isError:false});

  if(isRetry)
  {
  this.props.navigation.navigate('SlotScreen');
  }
  else
  {
    this.props.navigation.navigate('HomeScreen');
  }
}


closeSuccessfull = (isView) =>
{
    this.setState({isSuccessfull:false})
    
    if(isView)
    {
      this.props.navigation.navigate('AppointmentScreen');
    }

    else
    {
      this.props.navigation.navigate('HomeScreen');
    }
}


onClose = () =>
{
  if(this.state.isSuccessfull)
  {
    this.props.navigation.navigate('HomeScreen');

  }

  else
  {
    this.props.navigation.navigate('CheckoutScreen');
  }
}



  onChangeForm = (form) => {
    console.log(form)
  }


  
  render() {

    const windowWidth = Dimensions.get('window').width;
    const total = this.props.orders.total * 100;
    const skill = Object.values(this.props.orders.service);
    var isView = false;
    var isRetry = false;

    return (

      <View style={styles.container}> 

      {this.state.isLoading == true ?

        <View style={styles.loading}>

        <UIActivityIndicator name="Saving" size={80} color="black" />
        <Text style={styles.loadingText}> Saving Appointment</Text>
      </View>
        :
          [

            (!this.state.successfull || !this.state.error ?
        // <ExpoStripePurchase
        // publicKey={config.STRIPE_KEY}
        // amount={total}
        // imageUrl="www.clever-image-url.com"
        // description={skill[0].Name}
        // currency="GBP"
        // onClose={this.onClose}
        // onPaymentSuccess={async (token) => this.onPaymentSuccess(token,total)}
        // style={{width: windowWidth * 2.5, alignSelf: 'center'}} />


        <View style={styles.formArea}>
        <View style={styles.formItems}> 
        <TextInput
        value={this.state.username}
        onChangeText={(username) => this.setState({ username })}
        placeholder={'Cardholders Name'}
        placeholderTextColor='black'
        style={styles.longCardText}
        placeholderColor="#3897f1"
        underlineColorAndroid='transparent'
      />
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'XXXX XXXX XXXX XXXX'}
          placeholderTextColor='black'
          style={styles.longCardText}
          placeholderColor="#3897f1"
          underlineColorAndroid='transparent'
        />
        <View style={styles.expirySecret}> 
        <TextInput
          value=''
          placeholderTextColor='black'
          onChangeText={(password) => this.setState({ password })}
          placeholder={'MM/YY'}
          placeholderColor="#c4c3cb"
          style={styles.shortCardText}
        />
        <TextInput
        value={'CVV'}
        placeholderTextColor='black'
        onChangeText={(password) => this.setState({ password })}
        placeholder={'CVV'}
        placeholderColor="#c4c3cb"
        style={styles.shortCardText}
      />
      </View>
      </View>

        </View>
          
            : <View></View>

            )
          ]
      }

      
      <SCLAlert
      show={this.state.isError}
      onRequestClose={() => this.isError(isRetry=true)}
      theme="danger"
      title="Info"
      subtitle={"Opps Somethings when wrong with the Appointment\n\n"+this.state.errorMessage}
      headerIconComponent={<Ionicons name="ios-thumbs-down" size={32} color="white" />}
    >
      <SCLAlertButton theme="success" onPress={() => this.isError(isRetry=true)}>Try Again</SCLAlertButton>
      <SCLAlertButton theme="danger" onPress={() => this.isError(isRetry=false)}>Cancel</SCLAlertButton>
    </SCLAlert>

    <SCLAlert
    show={this.state.isSuccessfull}
    onRequestClose={() => this.closeSuccessfull(isView=true)}
    theme="success"
    title="Pay Successs"
    subtitle="Appointment was created successfully"
    headerIconComponent={<Ionicons name="ios-thumbs-up" size={32} color="white" />}
  >
    <SCLAlertButton theme="success" onPress={() => this.closeSuccessfull(isView=true)}>View</SCLAlertButton>
    <SCLAlertButton theme="info" onPress={() => this.closeSuccessfull(isView=false)}>Return</SCLAlertButton>
  </SCLAlert>
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
      flex: 1,
      position:'relative'
  
    },
    formArea: {
      height:'50%',
      alignSelf:'center',
      width:'100%',
      top:"20%",
      backgroundColor:'white',

  
    },

    cardLegnth:{

    },
    shortLength:{

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
    expirySecret:
    {
      flex:1,
      flexDirection:'row'

    },
  

    loadingText:{
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center', 
      fontSize:40,
      color:'#0D5916'
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
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    longCardText: {
      height: 70,
      fontSize: 14,
      borderTopColor:'black',
      backgroundColor: 'white',
      paddingLeft: 10,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15,
      borderBottomWidth :5,
      borderBottomColor: '#000',
      backgroundColor: 'white',
    },
    shortCardText: {
      height: 70,
      fontSize: 14,
      borderTopColor:'black',
      backgroundColor: 'white',
      paddingLeft: 10,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15,
      border:5,
      borderBottomColor: '#000',
      backgroundColor: 'white',
      width:'20%',
      justifyContent:'space-between'
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

