import React, { Component } from 'react';
import { FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ListItem } from 'react-native-elements';
import Moment from 'moment';
import { connect } from 'react-redux';
import config from '../config';
import axios from 'react-native-axios';
import { Ionicons } from '@expo/vector-icons';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UIActivityIndicator} from 'react-native-indicators';
import retry from 'retry';

import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

class CheckoutScreen extends Component {
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

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }


  async componentDidMount() {
    this.setState({ isSuccessfull: false, error: false });

    Stripe.setOptionsAsync({
      publishableKey: config.STRIPE_KEY, // Your key
      androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
      merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
    });

    this.setState({isVisa:false,isMastercard:false,isAmericanExpress:false});
  }


  async checkOut()
  {

    this.setState({ isBack: false });


    const authToken = await AsyncStorage.getItem('token');
    const slot = this.props.orders.slot;
    const skill = Object.values(this.props.orders.service);
    const barber = this.props.orders.barber;

    var expiryArray = this.state.expiry.split('/')
    var expirationMonth =  Number(expiryArray[0]);
    var expYear = Number(expiryArray[1]);

    var total = this.props.orders.total;



    const params ={
      number:this.state.cardnumber,
      expMonth:expirationMonth,
      expYear:expYear,
      cvc:this.state.cvv,
    }

    var token;
    var error;

    await Stripe.paymentRequestWithCardFormAsync().then((value) => { token = value  }) .catch((err) => {  
      
            error = err;
    })

    
    if(error)
    {
      return;
    }

    this.setState({ isLoading: true });

    const operation = retry.operation({
      retries: 3,
      factor: 3,
      minTimeout: 1 * 100,
      maxTimeout: 60 * 100,
      randomize: true,
    });


    operation.attempt(async (currentAttempt) => 
    {
try{
    
      var  response = await axios({
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
    })




    if (response.status === 200 && token) {

      this.setState({ isSuccessfull: true, isPayment: true });
      this.setState({ isLoading: false });
      return;
    }

  } catch (error) {
    if(operation.retry(error.response.status===502))
    {
      {return; }
    }

    else
    {
      res = error.response;
      this.setState({ isLoading: false });
      this.setState({ errorMessage: res.data.message, isError: true });

    }
  }

  });
 }



  isError = (isRetry) => {
    this.setState({ isError: false });

    if (isRetry) {
      this.props.navigation.push('SlotScreen');
    }
    else {
      this.props.navigation.push('HomeScreen');
    }
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



  onChangeForm = (form) => {

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
          {Moment(new Date(item.date)).format("ddd DD MMM YYYY")}
        </Text>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Title style={styles.leftText}>Slot:</ListItem.Title>
        <ListItem.Content>
        </ListItem.Content>
        <Text style={styles.rightText}>
          {item.startime} - {item.endtime}
        </Text>
      </ListItem>

        <ListItem style={styles}>
          <ListItem.Title style={styles.leftText}>x1  {item.name}</ListItem.Title>
          <ListItem.Content>
          </ListItem.Content>
          <Text style={styles.rightText}>£{Number(item.price).toFixed(2)}
          </Text>
        </ListItem>
  
      
      <ListItem topDivider>
        <ListItem.Title style={styles.leftText}>Total:</ListItem.Title>
        <ListItem.Content>
        </ListItem.Content>
        <Text style={styles.rightText}>
          £{Number(item.total).toFixed(2)}
        </Text>
      </ListItem>
    </View>)
  }
  render() {

  var order = this.props.orders;

    data = [
    { "barber":order.barber,
      "name":order.service[0].Name,
      "price":order.service[0].Price,
      "startime":order.slot.startTime,
      "endtime":order.slot.endTime,
      "date":order.slot.date,
      "total":order.total
    }]
    
    return (

      <View style={styles.container}>

      {this.state.isLoading &&

        <View style={styles.loading}>
        <UIActivityIndicator name="Saving" size={80} color="black" />
        <Text style={styles.loadingText}> Processing Payment</Text>
      </View>

      }

      {!this.state.isError && !this.state.isSuccessfull && !this.state.isLoading &&

        <View> 
   
<View> 
      <View style={styles.subHeader}>
      <Text style={styles.textStyle}>
        Order Details
        </Text>
    </View>

    <View style={styles.details}>
      <FlatList style={styles.FlatList}
        data={data}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        ListFooterComponent={this.FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
      />
    </View>
    <View style={styles.Footer}>
      <TouchableOpacity
        onPress={() => this.checkOut()}
      >
        <Text style={styles.FooterText}>
          Checkout
      </Text>
      </TouchableOpacity>
    </View>
    
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
        title="Pay Success"
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
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor:'#fff44f'
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
    fontSize: RFValue(35),
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
    fontSize: RFValue(35),
    textAlign: 'center',

  },
  leftText: {
    fontSize: RFValue(20),
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 50

  },

  paymentButton:
  {
    color: 'white',
    fontSize: RFValue(40),
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
    justifyContent: 'center',
    backgroundColor:'#fff44f'
  },

  loadingText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: RFValue(30),
    color: '#0D5916'
  },

  rightText: {
    fontSize: RFValue(20),
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 5,
    right: 50,
  },
})
export default connect(mapStatetoProps)(CheckoutScreen);

