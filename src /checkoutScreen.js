import React, { Component } from 'react';
import { FlatList, Text, View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ListItem } from 'react-native-elements';
import Moment from 'moment'
import { connect } from 'react-redux';

class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      placeholders: { number: "XXXX XXXX XXXX XXXX", expiry: "MM/YY", cvc: "CVC" },
      labels: { number: "CARD NUMBER", expiry: "EXPIRY", cvc: "CVC/CCV" }
    }
  };

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
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
    
    

    console.log(data);

    return (

      <View styles={styles.container}>
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
            onPress={() => this.props.navigation.navigate('StripePaymentScreen')}
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

  rightText: {
    fontSize: RFValue(20),
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 5,
    right: 50,
  },
})
export default connect(mapStatetoProps)(CheckoutScreen);

