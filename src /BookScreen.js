import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity,} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { setBarber, setBarberId } from './store/actions'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import BarberComponent from './functionalComponents/BarberComponent';

class BookScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stylists: []
    };
  }

  async componentDidMount() {

    const token = await AsyncStorage.getItem('token');

    const response = await axios({
      method: 'get',
      url: 'https://5b62e75b6995.ngrok.io/api/barbers',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    try {

      if (response.status === 200) {

          const stylists = response.data.stylists;
          this.setState({ stylists: stylists })
      }

    } catch (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    }
  }

  render() {
    return (
      
  <BarberComponent
    stylists={this.state.stylists} 
    navigation={this.props.navigation}
    setBarber={this.props.setBarber}
    setBarberId={this.props.setBarberId}
    />
    )
  }}


const mapStatetoProps = (state) => {

  return {
    orders: state.orderReducer
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    setBarber: (data) => dispatch(setBarber(data)),
    setBarberId: (data) => dispatch(setBarberId(data))
  }

}


export default connect(mapStatetoProps, mapDispatchToProps)(BookScreen);
