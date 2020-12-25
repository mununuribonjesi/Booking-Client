import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity,} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { setBarber, setBarberId } from './store/actions'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import BarberComponent from './functionalComponents/BarberComponent';
import config from '../config';
class BookScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stylists: []
    };
  }

  async componentDidMount() {


     var response = await this.getBarbers();     

     console.log(response.data);

      if (response.status === 200) {

          const stylists = response.data.stylists;
          this.setState({ stylists: stylists })
      }
  }


  async getBarbers()
  {
    const token = await AsyncStorage.getItem('token');

      var response;

      if(this.props.navigation.state.params.isGetByService)
      {
        var service = Object.values(this.props.service);

        var skillId = service[0].skillId.toString();
  
        response = await axios({
          method: 'get',
          url: config.Availability_URL +'/api/skilledBarbers',
          params: {
            'skillId':skillId.toString()
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
          
        });

      }
      else
  {
     response = await axios({
      method: 'get',
      url: config.Availability_URL +'/api/barbers',
      headers: {
        'Authorization': `Bearer ${token}`
      }
      
    });
  }

  return response;
}

  render() {
    return (
      
  <BarberComponent
    stylists={this.state.stylists} 
    navigation={this.props.navigation}
    setBarber={this.props.setBarber}
    setBarberId={this.props.setBarberId}
    isGetByService={this.props.navigation.state.params.isGetByService}
    />
    )
  }}


const mapStatetoProps = (state) => {

  return {
    orders: state.orderReducer,
    service:state.orderReducer.service
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    setBarber: (data) => dispatch(setBarber(data)),
    setBarberId: (data) => dispatch(setBarberId(data))
  }

}


export default connect(mapStatetoProps, mapDispatchToProps)(BookScreen);
