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
import {FontAwesome5 } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';

class ServicesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ischecked: [],
      total: 0.00,
      services: [],
      data: [],
      isLoading:false,
      isError:false,
      errorMessage:''
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
    var res;
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
    }

    return res;
  }



  isError = () =>
  {
    this.setState({isError:!this.state.isError});
    this.props.navigation.navigate('LocationScreen');
  }



  isGetByService() {
    return this.props.navigation.state.params.isGetByService;
  }

  render() {
    const isGetByService = this.isGetByService();

    return (

      <View> 
      <SCLAlert
      show={this.state.isError}
      onRequestClose={this.isError}
      theme="danger"
      title="Oops! Something went wrong"
      subtitle={"error fetching services \n\n"+this.state.errorMessage}
      headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
    >
      <SCLAlertButton theme="danger" onPress={this.isError}>OK</SCLAlertButton>
    </SCLAlert>

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
      </View>
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