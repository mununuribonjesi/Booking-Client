import React, { Component } from 'react';
import { FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import Moment from 'moment'
import { connect } from 'react-redux';
import { CreditCardInput } from "react-native-credit-card-fullpage-form";
import RBSheet from "react-native-raw-bottom-sheet";
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      placeholders: { number: "XXXX XXXX XXXX XXXX", expiry: "MM/YY", cvc: "CVC" },
      labels: { number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV" },
      cardDetails:[]
    }
  };

  async componentDidMount()
  {
    await Stripe.setOptionsAsync({
      publishableKey: 'pk_test_r8rYKYySFEUY1JbMdRKRpcl7', // Your key
      ///androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
      ///merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
    });
  }

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  onChangeForm = (form) => {
    this.setState({cardDetails:form})
  }

  async stripePayment()
  {

    console.log(this.state.cardDetails.values)

    var str = this.state.cardDetails.values.expiry;
    var parts = str.slice(0, -1).split('/');
    var month = parts[0];
    var year = parts[1];


    const params = {
      number: this.state.cardDetails.values.number,
      expMonth: Number(month),
      expYear: Number(year),
      cvc: this.state.cardDetails.values.cvc,
    };

    console.log(params);

    const token = await Stripe.createTokenWithCardAsync(params);

  }

  FirstRoute = () => (
    <FlatList style={styles.FlatList}
      data={Object.values(this.state.upcomingAppointments)}
      ItemSeparatorComponent={this.FlatListItemSeparator}
      ListFooterComponent={this.FlatListItemSeparator}
      keyExtractor={(item, index) => index.toString()}
      renderItem={this.renderAppointment}
    />)

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

    const windowHeight = Dimensions.get('window').height;

    return (

      <View styles={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.textStyle}>
            Order Details
            </Text>
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={windowHeight / 2}
          customStyles={{
            container: {
              justifyContent: "center",
              backgroundColor: 'white'
            }
          }}
        >
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.formContainer}>
              <View style={styles.cardInputForm}>
                <CreditCardInput style={styles.cardModal} labelStyle={styles.cardLabel} labels={this.state.labels} placeholders={this.state.placeholders} placeholderColor="gray" onChange={(form) => this.onChangeForm(form)} />
              </View>
           
              <View style={styles.pbackground}>
              <TouchableOpacity
              onPress={() => this.stripePayment()}
            >
                <Text style={styles.paymentButton}>
                  Pay
                </Text>
                </TouchableOpacity>
              </View>
           
            </View>
          </KeyboardAvoidingView>
        </RBSheet>
        <View style={styles.details}>
          <FlatList style={styles.FlatList}
            data={Object.values(this.props.orders)}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            ListFooterComponent={this.FlatListItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        </View>
        <View style={styles.Footer}>
          <TouchableOpacity
            onPress={() => this.RBSheet.open()}
          >
            <Text style={styles.FooterText}>
              Checkout
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
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

const mapStatetoProps = (state) => {
  return {
    orders: state
  }
}

export default connect(mapStatetoProps)(CheckoutScreen);

