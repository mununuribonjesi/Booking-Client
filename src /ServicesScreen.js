import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import { setService, setTotal } from './store/actions'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import config from '../config';
import {UIActivityIndicator} from 'react-native-indicators';
import { ServiceComponent } from './functionalComponents/ServiceComponent';

class ServicesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ischecked: [],
      total: 0.00,
      services: [],
      data: [],
      isLoading:false
    };
  }

  async componentDidMount() {
    
    this.setState({isLoading:true})
    var response = await this.getServices();
    if (response.status === 200) {

      const skills = response.data.skills;
      this.setState({ data: skills });
    
    let checklist = [...this.state.ischecked]
    var data = [...this.state.data]

    data.forEach(ckb => {

      checklist.push(false);

    });
    this.setState({ ischecked: checklist })
  }
    this.setState({isLoading:false})
  }


  async getServices() {
    var response;
    const token = await AsyncStorage.getItem('token');
    var organisationId = this.props.orders.organisationId

    if (this.isGetByService()) {
      response = await axios({
        method: 'get',
        url: config.Availability_URL + '/api/skills',
        params: {
          'organisationId':organisationId
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    else {
      response = await axios({
        method: 'get',
        url: config.Availability_URL + '/api/barberskills',
        params: {
          'barberId': this.props.barberId,
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return response;
  }


  isGetByService() {
    return this.props.navigation.state.params.isGetByService;
  }

  render() {
    const isGetByService = this.isGetByService();

    return (

      <ServiceComponent

      isLoading = {this.state.isLoading}
      data={this.state.data}
      isGetByService={isGetByService}
      total={this.state.total}
      services={this.state.services}
      isChecked={this.state.ischecked}
      setTotal={this.props.setTotal}
      setService={this.props.setService}
      navigation={this.props.navigation}
      /> 

        

    )
  }
}

const mapStatetoProps = (state) => {
  return {
    orders: state.orderReducer,
    barberId: state.orderReducer.barberId.toString()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setService: (data) => dispatch(setService(data)),
    setTotal: (data) => dispatch(setTotal(data))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ServicesScreen);