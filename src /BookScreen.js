import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { setBarber, setBarberId, setOrganisationId } from './store/actions'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import BarberComponent from './functionalComponents/BarberComponent';
import {FontAwesome5 } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';

import config from '../config';
import {
  UIActivityIndicator,
} from 'react-native-indicators';

class BookScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stylists: [],
      isLoading:false,
      ischecked: [],
      isError:false,
      errorMessage:''
    };
  }

  async componentDidMount() {
    this.setState({isLoading:true});
    var response = await this.getBarbers();

    if (response.status === 200) {
      const stylists = response.data.stylists;
      this.setState({ stylists: stylists });
      let checklist = [...this.state.ischecked];
      var data = [...this.state.ischecked];

      data.forEach(ckb =>{
        checklist.push(false);
      });

      this.setState({ ischecked: checklist })

    }
    this.setState({isLoading:false});
  }




  isError = () =>
  {
    this.setState({isError:!this.state.isError});
    this.props.navigation.navigate('LocationScreen');
  }



  async getBarbers() {
    const token = await AsyncStorage.getItem('token');
    var res;
    var organisationId = this.props.orders.organisationId
    if (this.props.navigation.state.params.isGetByService) {
      var service = Object.values(this.props.service);
      var skillId = service[0].skillId.toString();
     
      await axios({
        method: 'get',
        url: config.Availability_URL + '/api/skilledBarbers',
        params: {
          'skillId': skillId.toString(),
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
       
      await axios({
        method: 'get',
        url: config.Availability_URL + '/api/barbers',
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
    return res;
  }

  render() {
    return (

  
      (this.state.isLoading == true ?


        <View style={styles.loading}>
        <UIActivityIndicator size={80} color="black" />

      </View>
  :[
    <View> 
      <BarberComponent
        stylists={this.state.stylists}
        navigation={this.props.navigation}
        setBarber={this.props.setBarber}
        setBarberId={this.props.setBarberId}
        isGetByService={this.props.navigation.state.params.isGetByService}
        isChecked={this.state.ischecked}
      />

 
        <SCLAlert
      show={this.state.isError}
      onRequestClose={this.isError}
      theme="danger"
      title="Oops! Something went wrong"
      subtitle={"error fetching Barbers \n\n"+this.state.errorMessage}
      headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
    >
      <SCLAlertButton theme="danger" onPress={this.isError}>OK</SCLAlertButton>
    </SCLAlert>
    </View>
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
