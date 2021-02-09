import React, { Component } from 'react';
import { FlatList, ScrollView, Text, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ExpoStripePurchase from 'expo-stripe-webview';
import { Ionicons } from '@expo/vector-icons';
import axios from 'react-native-axios';
import valid  from "card-validator";
import { FontAwesome,Fontisto } from '@expo/vector-icons'; 
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
import { expirationMonth } from 'card-validator/dist/expiration-month';

class StripePaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      labels: { number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV" },
      isLoading: false,
      error: false,
      isBack: true,
      isSuccessfull: false,
      isPayment: false,
      isError: false,
      isView: false,
      isRetry: false,
      errorMessage:'',
      username:'',
      expiry:'',
      cvv:'',
      cardnumber:'',
      isVisa:false,
      isMastercard:false,
      isAmericanExpress:false,
      isJcb:false,
      isDiscover:false
    }

    this.isError = this.isError.bind(this);
    this.closeSuccessfull = this.closeSuccessfull.bind(this);
  };


  async componentDidMount() {
    this.setState({ isSuccessfull: false, error: false });

    Stripe.setOptionsAsync({
      publishableKey: config.STRIPE_KEY, // Your key
      androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
      merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
    });
    this.setState({isVisa:false,isMastercard:false,isAmericanExpress:false});

  }




  isError = (isRetry) => {
    this.setState({ isError: false });

    if (isRetry) {
      this.props.navigation.navigate('SlotScreen');
    }
    else {
      this.props.navigation.navigate('HomeScreen');
    }
  }

  async handlePayment()
  {

    this.setState({ isBack: false });
    this.setState({ isLoading: true });

    const authToken = await AsyncStorage.getItem('token');
    const slot = this.props.orders.slot;
    const skill = Object.values(this.props.orders.service);
    const barber = this.props.orders.barber;

    console.log('handle ith')

    var expiryArray = this.state.expiry.split('/')
    var expirationMonth =  Number(expiryArray[0]);
    var expYear = Number(expiryArray[1]);

    var total = this.props.orders.total;

    console.log(total);
    
    console.log(token);
    const params ={
      number:this.state.cardnumber,
      expMonth:expirationMonth,
      expYear:expYear,
      cvc:this.state.cvv,
    }

    const token = await Stripe.createTokenWithCardAsync(params);
    
    console.log(token);
    var res;

    await axios({
      method: 'post',
      url: config.Stripe_URL + '/api/payment',
      data: {
        'token': token.tokenId,
        'total': total*100,
        'name': barber,
        'startTime': slot.startTime,
        'endTime': slot.endTime,
        'date': slot.date,
        'skill': skill[0].skillId
      },
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => {

      res = response

    }).catch(error => {
      if (error.response) {
        res = error.response;
        this.setState({ errorMessage: res.data.message, isError: true });
      }
    })


    console.log(res.data.message);

    if (res.status === 200 && token) {

      this.setState({ isSuccessfull: true, isPayment: true });
    }

    this.setState({ isLoading: false });
  }


  closeSuccessfull = (isView) => {
    this.setState({ isSuccessfull: false })

  

    if (isView) {
      this.props.navigation.navigate('AppointmentScreen');
    }

    else {
      this.props.navigation.navigate('HomeScreen');
    }
  }


  onClose = () => {
    if (this.state.isSuccessfull) {
      this.props.navigation.navigate('HomeScreen');

    }

    else {
      this.props.navigation.navigate('CheckoutScreen');
    }
  }

  cardnumberChange=(text)=>
  {
    var regex = /^[0-9 ]*$/;
     // false or true
    //getCardType(text);


    var numberValidation = valid.number(text);

    if (!numberValidation.isPotentiallyValid) {
      console.log('not valid')
      this.setState({isDiscover:false,isJcb:false,isVisa:false,isMastercard:false,isAmericanExpress:false});
    }

    if (numberValidation.card) {


      console.log(numberValidation.card.type);
      switch(numberValidation.card.type)
      {
        case 'visa':
          this.setState({isDiscover:false,isJcb:false,isVisa:true,isMastercard:false,isAmericanExpress:false});
          break;
        
        case 'mastercard':
          this.setState({isDiscover:false,isJcb:false,isVisa:false,isMastercard:true,isAmericanExpress:false});
          break;

        case 'american-express':
          this.setState({isDiscover:false,isJcb:false,isVisa:false,isMastercard:false,isAmericanExpress:true});
          break;
        case 'jcb':
          this.setState({isDiscover:false,isJcb:true,isVisa:false,isMastercard:false,isAmericanExpress:false});
        break;
        case 'discover':
          this.setState({isDiscover:true,isJcb:false,isVisa:false,isMastercard:false,isAmericanExpress:false});
        break;

          default:
            this.setState({isDiscover:false,isJcb:false,isVisa:false,isMastercard:false,isAmericanExpress:false});
      }
    }
    else
    {
      this.setState({isDiscover:false,isJcb:false,isVisa:false,isMastercard:false,isAmericanExpress:false});
    }

    if(!regex.test(text))
    {
      return
    }

    if (text.indexOf('.') >= 0 || text.length > 24) {
      // Since the keyboard will have a decimal and we don't want
      // to let the user use decimals, just exit if they add a decimal
      // Also, we only want 'MM/YY' so if they try to add more than
      // 5 characters, we want to exit as well
      return;
  }

    this.setState({
      cardnumber: text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
    });
 
  }


  cvvChange = (text) =>
  {

    var regex = /^[0-9]*$/;

    if(!regex.test(text))
    {
      return
    }
    if (text.indexOf('.') >= 0 || text.length > 4) {
      // Since the keyboard will have a decimal and we don't want
      // to let the user use decimals, just exit if they add a decimal
      // Also, we only want 'MM/YY' so if they try to add more than
      // 5 characters, we want to exit as well
      return;
  }


  // Update the state, which in turns updates the value in the text field
  this.setState({
      cvv: text

  });


  }
  expiryChange = (text) => {

    var regex = /^[0-9/]*$/;

    if(!regex.test(text))
    {
      return
    }
    if (text.indexOf('.') >= 0 || text.length > 5) {
      // Since the keyboard will have a decimal and we don't want
      // to let the user use decimals, just exit if they add a decimal
      // Also, we only want 'MM/YY' so if they try to add more than
      // 5 characters, we want to exit as well
      return;
  }

  if (text.length === 2 && this.state.expiry.length === 1) {
      // This is where the user has typed 2 numbers so far
      // We can manually add a slash onto the end
      // We check to make sure the current value was only 1 character
      // long so that if they are backspacing, we don't add on the slash again
      text += '/'
  }

  // Update the state, which in turns updates the value in the text field
  this.setState({
      expiry: text
  });
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
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    return (

      <View style={styles.container}>

      {this.state.isLoading == true &&

        <View style={styles.loading}>

        <UIActivityIndicator name="Saving" size={80} color="black" />
        <Text style={styles.loadingText}> Saving Appointment</Text>
      </View>}



      {!this.state.isSuccessfull && !this.state.isError &&
        <View style={styles.formArea}>
          <View style={styles.formItems}>
          <KeyboardAvoidingView behavior="position" > 
            <View style={styles.loginButton}>
              <Text style={styles.buttonText}>
                <FontAwesome5 name="apple-pay" size={50} color="white" />
              </Text>
            </View>

            <Text style={styles.dividerText}>
              OR
            </Text>
              <View>
       
                <View style={styles.cardinput}> 
                <Text     style={{padding: 10}}> 

                {this.state.isVisa &&  <FontAwesome name="cc-visa" size={40} color="black" />}
                {this.state.isMastercard &&  <FontAwesome5 name="cc-mastercard" size={50} color="black" />}
                {this.state.isAmericanExpress && <Fontisto name="american-express" size={40} color="black" />}
                {this.state.isJcb && <Fontisto name="jcb" size={40} color="black" />}
                {this.state.isDiscover && <FontAwesome5 name="cc-discover" size={40} color="black" />}

                </Text>
                <TextInput
                  value={this.state.cardnumber}
                  onChangeText={(text) => this.cardnumberChange(text)}
                  placeholder={'XXXX XXXX XXXX XXXX'}
                  placeholderTextColor='black'
                  style={styles.longCardText}
                  placeholderColor="#3897f1"
                  underlineColorAndroid='transparent'
                />
                </View>

                <View style={{ flexDirection: "row" }}>

                  <View style={{ flex: 1 }}>
                    <TextInput
                      value={this.state.expiry}
                      placeholderTextColor='black'
                      onChangeText={(text)=>this.expiryChange(text)}
                      placeholder={'MM/YY'}
                      placeholderColor="#c4c3cb"
                      style={styles.shortCardText}
                    />
                  </View>

                  <View style={{ flex: 1, marginBottom: '10%' }}>
                    <TextInput
                      value={this.state.cvv}
                      placeholderTextColor='black'
                      onChangeText={(cvv) => this.cvvChange(cvv)}
                      placeholder={'CVV'}
                      placeholderColor="#c4c3cb"
                      style={styles.shortCardText}
                    />
                  </View>
                </View>
                <TouchableOpacity onPress={()=>{this.handlePayment()}}>
                <View style={styles.loginButton}>
                  <Text style={styles.buttonText}>
                    Pay
                </Text>
                </View>
                </TouchableOpacity>
              </View>

              </KeyboardAvoidingView>
          
          </View>
        </View>
      }


        <SCLAlert
          show={this.state.isError}
          onRequestClose={() => this.isError(isRetry = true)}
          theme="danger"
          title="OOPS"
          subtitle={this.state.errorMessage}
          headerIconComponent={<Ionicons name="ios-thumbs-down" size={32} color="white" />}
        >
          <SCLAlertButton theme="success" onPress={() => this.isError(isRetry = true)}>Try Again</SCLAlertButton>
          <SCLAlertButton theme="danger" onPress={() => this.isError(isRetry = false)}>Cancel</SCLAlertButton>
        </SCLAlert>

        <SCLAlert
          show={this.state.isSuccessfull}
          onRequestClose={() => this.closeSuccessfull(isView = true)}
          theme="success"
          title="Pay Successs"
          subtitle="Appointment was created successfully"
          headerIconComponent={<Ionicons name="ios-thumbs-up" size={32} color="white" />}
        >
          <SCLAlertButton theme="success" onPress={() => this.closeSuccessfull(isView = true)}>View</SCLAlertButton>
          <SCLAlertButton theme="info" onPress={() => this.closeSuccessfull(isView = false)}>Return</SCLAlertButton>
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
    position: 'relative',
    height: '100%',
    top: 0, left: 0, right: 0, bottom: 0


  },
  formItems: {
    marginTop: '5%'

  },
  dividerText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: '8%'

  },
  formArea: {
    height: '100%',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff44f',
  },



  expirySecret:
  {
    flex: 1,
    flexDirection: 'row',
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600'
  },

  loadingText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    color: '#0D5916'
  },
  
  cardinput:{
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom:10,
    width:'92%',
    left: 15,
    marginBottom:10,
    borderTopColor: 'black',
    borderWidth:5,
    textAlign:'center'


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
    height: 60,
    fontSize: 14,
    borderTopColor: 'black',
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderBottomColor: '#000',
    width:'60%',
    textAlign:'center'
    
  },
  cardholderText:{
    height: 50,
    fontSize: 14,
    borderTopColor: 'black',
    backgroundColor: 'white',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    borderBottomColor: '#000',
    backgroundColor: 'white',
    borderWidth:5

  },
  shortCardText: {
    height: 60,
    fontSize: 14,
    borderTopColor: 'black',
    backgroundColor: 'white',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: '#000',
    backgroundColor: 'white',
    width: '85%',
    borderTopColor: 'black',
    borderWidth:5
  },

  loginButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 60,
    textAlign: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '10%',

  },


})

export default connect(mapStatetoProps)(StripePaymentScreen);

