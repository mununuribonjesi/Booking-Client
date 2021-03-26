import React, { Component } from 'react';
import {FlatList, Text, View,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Tab from './functionalComponents/AppointmentComponent';
import {ListItem} from 'react-native-elements';
import Moment from 'moment';
import config from '../config';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setBarber, setBarberId } from './store/actions'
import { connect } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import {UIActivityIndicator} from 'react-native-indicators';
import {FontAwesome5 } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';
import axiosRetry from 'axios-retry';

class AppointmentScreen extends Component
{

    constructor(props) {
        super(props);

        this.state = {
          upcomingAppointments:[],
          recentAppointments:[],
          index:0,
          isError:false,
          errorMessage:'',
          isLoading:false
        };
      }


      async componentDidMount() {


        this.setState({isLoading:true});

        var response = await this.getCustomerAppointments();


        if (response.status === 200) {     
        var customerAppointments = response.data.customerApp;
        var upcomingAppointments = customerAppointments.filter(ua => {
        var str = ua.endTime;
        var parts = str.slice(0, -1).split('T');
        var dateComponent = parts[0];
        var timeComponent = parts[1];

        return Moment(dateComponent+'T'+timeComponent) > Moment()
        
        });

        var recentAppointments = customerAppointments.filter(ra => {
        var str = ra.endTime;
        var parts = str.slice(0, -1).split('T');
        var dateComponent = parts[0];
        var timeComponent = parts[1];
  
        return Moment(dateComponent+'T'+timeComponent) < Moment()
        
        });
          this.setState({upcomingAppointments:upcomingAppointments,recentAppointments:recentAppointments});
        }

        this.setState({isLoading:false});
     }


     isError = () =>
    {
      this.setState({isError:!this.state.isError});
      this.props.navigation.navigate('HomeScreen');
    }


      async getCustomerAppointments()
      {
        const token = await AsyncStorage.getItem('token');
        

        var res;

        axiosRetry(axios,{retries:3});

       await axios({
          method: 'get',
          url: config.Availability_URL +'/api/customerAppointments',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            'customerId':this.props.userId.toString()
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

          return res;
    }



  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  setIndex(index)
  {
    this.setState({index:index});
  }

    FirstRoute = () => (
      <FlatList style={styles.FlatList}
        data={Object.values(this.state.upcomingAppointments)}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderAppointment}
      />)
    

    
    SecondRoute = () => (<FlatList style={styles.FlatList}
        data={Object.values(this.state.recentAppointments)}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderAppointment}
      />)



    renderAppointment = ({ item }) => {

        return (
          <View style={{backgroundColor:'black'}}>

          <View>
          <ListItem>
          <ListItem.Content>
          <Text style={{textAlign:"center",fontSize:RFValue(25)}}>{item.companyName +", "+ item.addressLine1 +", "+ item.town +", "+ item.postCode}
          </Text>
          </ListItem.Content>
        
        </ListItem>
            <ListItem style={styles}>
              <ListItem.Title style={styles.leftText}>Barber:</ListItem.Title>
              <ListItem.Content>
              </ListItem.Content>
              <Text style={styles.rightText}>{item.barber}
              </Text>
            </ListItem>
            <ListItem style={styles}>
              <ListItem.Title style={styles.leftText}>Service:</ListItem.Title>
              <ListItem.Content>
              </ListItem.Content>
              <Text style={styles.rightText}>{item.skill}
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
            <ListItem>
              <ListItem.Title style={styles.leftText}>Slot:</ListItem.Title>
              <ListItem.Content>
              </ListItem.Content>
              <Text style={styles.rightText}>
              {Moment(new Date(item.startTime)).format("HH:mm")} - {Moment(new Date(item.endTime)).format("HH:mm")} 
              </Text>
            </ListItem>
            
            <ListItem>
              <ListItem.Title style={styles.leftText}>Price:</ListItem.Title>
              <ListItem.Content>
    
              </ListItem.Content>
              <Text style={styles.rightText}>
              £{Number(item.price).toFixed(2)}
              </Text>
            </ListItem>

            </View>

          

        
            
          </View>)
      }


    render()
    {


      const renderScene = SceneMap({
        first: this.FirstRoute,
        second:this.SecondRoute,
      });

      const routes= [
        { key: 'first', title: 'Upcoming' },
        { key: 'second', title: 'Recent' },
      ];

      const index = this.state.index;

      const initialLayout = { width: Dimensions.get('window').width };
     
    return (

        <View style={styles.container}>
        <SCLAlert
      show={this.state.isError}
      onRequestClose={this.isError}
      theme="danger"
      title="Oops! Something went wrong"
      subtitle={"error fetching appointments \n\n"+this.state.errorMessage}
      headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
    >
      <SCLAlertButton theme="danger" onPress={this.isError}>OK</SCLAlertButton>
    </SCLAlert>

    
    {this.state.isLoading ?

      <View style={styles.loading}>
      <UIActivityIndicator name="Saving" size={80} color="black" />
      <Text style={styles.loadingText}> Getting Appointments</Text>
    </View>
    :

    <View>

        <View style={styles.subHeader}>
                  <Text style={styles.textStyle}>
                    Appointments
                    </Text>
                </View>
        
                <View style={styles.Body}>
                <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index) => this.setIndex(index)}
      initialLayout={initialLayout}
    />
                  <Text style={styles.textStyle}>

                  </Text>
        
                </View>
          
                <View style={styles.Footer}>
                  <TouchableOpacity
                     onPress={() =>
                        this.props.navigation.navigate("LocationScreen",{
                          isGetByService:false
                        })}
                  >
        
                  <Text style={styles.FooterText}>
                    Book Now 
                  </Text>
                  </TouchableOpacity>
                </View>

</View> 
                      }
           </View>
    )
    }   
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor:'#fff44f'
  },

  subHeader: {
    backgroundColor: '#fff44f',
    height: '10%'
  },

  FlatList:
  {

  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#4285F4'
  },

  loadingText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: RFValue(30),
    color: 'white'
  },

  textStyle: {
      textAlign: 'center',
      color: 'black',
      fontSize: RFValue(35),
      padding: 7
    },
    Body:{

      backgroundColor:'white',
      height:'75%'
    },

    Footer:{
      backgroundColor:'black',
      height:'15%'

    },

    FooterText:
    {
      color:'white',
      marginTop:25,
      fontSize:RFValue(35),
      textAlign: 'center',
      
    },
  logoText: {
    fontSize: 20,
    fontWeight: "800",

  },
})



const mapStatetoProps = (state) => {

    return {
      userId: state.orderReducer.userId,
    }
  }
  
  

  
  export default connect(mapStatetoProps)(AppointmentScreen);