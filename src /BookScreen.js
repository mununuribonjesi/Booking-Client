import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { setBarber, setBarberId, setOrganisationId } from './store/actions'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import BarberComponent from './functionalComponents/BarberComponent';
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

class BookScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stylists: [],
      isLoading:false
    };
  }

  async componentDidMount() {
    this.setState({isLoading:true});
    var response = await this.getBarbers();

    if (response.status === 200) {
      const stylists = response.data.stylists;
      this.setState({ stylists: stylists })
    }
    this.setState({isLoading:false});
  }


  async getBarbers() {
    const token = await AsyncStorage.getItem('token');
    var response;
    if (this.props.navigation.state.params.isGetByService) {
      var service = Object.values(this.props.service);
      var skillId = service[0].skillId.toString();
      var organisationId = this.props.orders.organisationId
      response = await axios({
        method: 'get',
        url: config.Availability_URL + '/api/skilledBarbers',
        params: {
          'skillId': skillId.toString(),
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    else {
      response = await axios({
        method: 'get',
        url: config.Availability_URL + '/api/barbers',
        params: {
          'organisationId':organisationId
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    return response;
  }

  render() {
    return (

  
      (this.state.isLoading == true ?


        <View style={styles.loading}>
        <UIActivityIndicator size={80} color="black" />

      </View>
  :[
      <BarberComponent
        stylists={this.state.stylists}
        navigation={this.props.navigation}
        setBarber={this.props.setBarber}
        setBarberId={this.props.setBarberId}
        isGetByService={this.props.navigation.state.params.isGetByService}
      />
  
  ]
      )

    )
  
  }
}

const mapStatetoProps = (state) => {
  return {
    orders: state.orderReducer,
    service: state.orderReducer.service
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    setBarber: (data) => dispatch(setBarber(data)),
    setBarberId: (data) => dispatch(setBarberId(data))
  }
}
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
  })

export default connect(mapStatetoProps, mapDispatchToProps)(BookScreen);
